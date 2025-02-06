import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PartialPaymentDialogComponent } from './components/partialPayment';

interface PendingDue {
    id: number;
    fullname: string;
    course: string;
    dueAmount: number;
    dueDate: string;
    status: 'Overdue' | 'Pending' | 'Partially Paid' | 'Cleared';
    paymentDate: string;
    lastReminder: string;
}

@Component({
    imports: [CommonModule, TableModule, ConfirmDialogModule, ButtonModule, TagModule, InputTextModule, BreadcrumbModule, DropdownModule, FormsModule, IconFieldModule, InputIconModule, PartialPaymentDialogComponent],
    providers: [ConfirmationService],
    template: `<div class="card">
        <p-breadcrumb [model]="items"></p-breadcrumb>

        <div class="flex justify-end items-center flex-column sm:flex-row">
            <p-dropdown [options]="statusOptions" [(ngModel)]="selectedStatus" placeholder="Filter by Status" class="w-40"> </p-dropdown>

            <p-iconfield iconPosition="left" class="ml-5">
                <input pInputText type="text" placeholder="Search keyword" />
                <p-inputIcon class="pi pi-search"></p-inputIcon>
            </p-iconfield>
        </div>

        <p-table [value]="pendingDues()" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="studentName">Candidate <p-sortIcon field="fullname"></p-sortIcon></th>
                    <th pSortableColumn="course">Course <p-sortIcon field="course"></p-sortIcon></th>
                    <th pSortableColumn="dueAmount">Amount (TND) <p-sortIcon field="dueAmount"></p-sortIcon></th>
                    <th pSortableColumn="dueDate">Due Date <p-sortIcon field="dueDate"></p-sortIcon></th>
                    <th>Last Reminder</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-due>
                <tr>
                    <td>{{ due.fullname }}</td>
                    <td>{{ due.course }}</td>
                    <td class="font-semibold">{{ due.dueAmount }}</td>
                    <td>{{ due.dueDate }}</td>
                    <td>
                        {{ getReminderMessage(due) }}
                    </td>
                    <td>
                        <p-tag [severity]="getStatusSeverity(due.status)" [value]="due.status"></p-tag>
                    </td>
                    <td *ngIf="due.status !== 'Cleared'">
                        <button pButton label="Send Reminder" icon="pi pi-bell" class="p-button-sm p-button-warning mr-2"></button>
                        <button pButton label="Pay Now" icon="pi pi-credit-card" class="p-button-sm p-button-success" (click)="confirmPayment(due, $event)"></button>
                    </td>
                    <td *ngIf="due.status === 'Cleared'">
                        <p>
                            No action required. Payment completed on <strong>{{ due.paymentDate }}</strong>
                        </p>
                    </td>
                </tr>
            </ng-template>
        </p-table>
        <p-confirmDialog></p-confirmDialog>
        <partial-payment-dialog [displayPaymentDialog]="displayPaymentDialog" [selectedDue]="selectedDue" (processPartialPayment)="processPartialPayment($event)" (processPayment)="selectedDue && processPayment(selectedDue)" (dialogClosed)="displayPaymentDialog = false"></partial-payment-dialog>
    </div>`,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `
})
export class PendingDuesComponent {
    searchTerm = '';
    selectedStatus: string | null = null;
    displayPaymentDialog = false;
    partialPaymentAmount: number = 0;
    selectedDue: PendingDue | null = null;
    paymentType: 'full' | 'partial' = 'partial'; // Added payment type choice
    constructor(private confirmationService: ConfirmationService) {}
    items: MenuItem[] = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Pending Dues', url: '/dashboard/fees/pending-dues' }
    ];
    statusOptions = [
        { label: 'All', value: null },
        { label: 'Overdue', value: 'Overdue' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Partially Paid', value: 'Partially Paid' },
        { label: 'Cleared', value: 'Cleared' }
    ];

    pendingDues: WritableSignal<PendingDue[]> = signal([
        { id: 1, fullname: 'Alice Johnson', course: 'Web Development', dueAmount: 500, dueDate: '2025-02-10', status: 'Overdue', paymentDate: '', lastReminder: '2025-02-02' },
        { id: 2, fullname: 'Bob Williams', course: 'Python for AI', dueAmount: 300, dueDate: '2025-02-15', status: 'Pending', paymentDate: '', lastReminder: '' },
        { id: 3, fullname: 'Charlie Brown', course: 'Cybersecurity Basics', dueAmount: 450, dueDate: '2025-02-20', status: 'Partially Paid', paymentDate: '', lastReminder: '' },
        { id: 4, fullname: 'David Lee', course: 'Data Science', dueAmount: 700, dueDate: '2025-02-25', status: 'Cleared', paymentDate: '2025-02-02', lastReminder: '' }
    ]);

    getReminderMessage(due: PendingDue): string {
        if (!due.lastReminder) {
            return due.status === 'Cleared' ? 'Payment is done' : 'No Reminder is sent';
        }
        return due.lastReminder;
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'Overdue':
                return 'danger';
            case 'Pending':
                return 'warn';
            case 'Partially Paid':
                return 'info';
            case 'Cleared':
                return 'success';
            default:
                return 'info';
        }
    }

    confirmPayment(user: PendingDue, event: Event) {
        if (user.status === 'Partially Paid' || user.status === 'Pending') {
            this.selectedDue = user;
            this.partialPaymentAmount = 0;
            this.displayPaymentDialog = true;
        } else {
            this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: `Are you sure you want to confirm the full payment for <b>${user.fullname}</b>?`,
                header: 'Confirm Payment',
                icon: 'pi pi-credit-card',
                rejectLabel: 'Cancel',
                acceptLabel: 'Yes, Confirm',
                rejectButtonStyleClass: 'p-button p-button-secondary',
                acceptButtonStyleClass: 'p-button-success',
                accept: () => {
                    this.processPayment(user);
                }
            });
        }
    }
    processPartialPayment(partialPaymentAmount:number) {
        if (!this.selectedDue || partialPaymentAmount <= 0){
            console.log('Please enter a valid amount.',this.selectedDue,partialPaymentAmount);
            return;
        } 
    
        const { dueAmount, id, paymentDate } = this.selectedDue;
    
        if (this.partialPaymentAmount > dueAmount) {
            console.log('Payment amount exceeds the due amount. Please enter a valid amount.');
            return;
        }
    
        const newDueAmount = dueAmount - partialPaymentAmount;
        const newStatus = newDueAmount === 0 ? 'Cleared' : 'Partially Paid';
        const newPaymentDate = newStatus === 'Cleared' ? new Date().toISOString().slice(0, 10) : paymentDate;
    
        this.pendingDues.update((dues) =>
            dues.map((due) => (due.id === id ? { ...due, dueAmount: newDueAmount, status: newStatus, paymentDate: newPaymentDate } : due))
        );
    
        this.displayPaymentDialog = false;
    }
    

    processPayment(user: PendingDue) {
        user.status = 'Cleared';
        user.paymentDate = new Date().toISOString().slice(0, 10);
        if(this.displayPaymentDialog){
            this.displayPaymentDialog = false;
        }
    }
}
