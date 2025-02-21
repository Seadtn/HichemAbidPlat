import { Component, signal, WritableSignal } from '@angular/core';
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DownloadDialogFilterComponent } from "./components/downloadDialog";
import { PendingDue } from '../../../Data/global';



@Component({
    imports: [CommonModule, TableModule, ConfirmDialogModule, ButtonModule, TagModule, InputTextModule, BreadcrumbModule, DropdownModule, FormsModule, IconFieldModule, InputIconModule, PartialPaymentDialogComponent, DownloadDialogFilterComponent],
    providers: [ConfirmationService],
    template: `<div class="card">
        <p-breadcrumb [model]="items"></p-breadcrumb>

        <div class="flex justify-end items-center flex-column sm:flex-row">
            <p-dropdown [options]="statusOptions" [(ngModel)]="selectedStatus" placeholder="Filter by Status" class="w-40"> </p-dropdown>
            <p-iconfield iconPosition="left" class="ml-5">
                <input pInputText type="text" placeholder="Search keyword" />
                <p-inputIcon class="pi pi-search"></p-inputIcon>
            </p-iconfield>
            <button pButton label="" icon="pi pi-download" class="p-button-sm p-button-info ml-2" (click)="openDownloadDial()"></button>
        </div>

        <p-table [value]="pendingDues()" [paginator]="true" [rows]="10" responsiveLayout="scroll">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="studentName">Candidate <p-sortIcon field="fullname"></p-sortIcon></th>
                    <th pSortableColumn="course">Course <p-sortIcon field="course"></p-sortIcon></th>
                    <th pSortableColumn="totalAmount">Total Amount (TND) <p-sortIcon field="totalAmount"></p-sortIcon></th>
                    <th pSortableColumn="paidAmount">Paid Amount (TND) <p-sortIcon field="paidAmount"></p-sortIcon></th>
                    <th pSortableColumn="restAmount">Rest Amount (TND) <p-sortIcon field="restAmount"></p-sortIcon></th>
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
                    <td class="font-semibold">{{ due.totalAmount }}</td>
                    <td class="font-semibold">{{ due.paidAmount }}</td>
                    <td class="font-semibold">{{ due.restAmount }}</td>
                    <td>{{ due.dueDate }}</td>
                    <td>
                        {{ getReminderMessage(due) }}
                    </td>
                    <td>
                        <p-tag [severity]="getStatusSeverity(due.status)" [value]="due.status"></p-tag>
                    </td>
                    <td *ngIf="due.status !== 'Cleared'">
                        <button *ngIf="due.lastReminder !== getCurrentDate()" pButton label="Send Reminder" icon="pi pi-bell" class="p-button-sm p-button-warning mr-2" (click)="sendReminder(due, $event)"></button>
                        <button pButton label="Pay Now" icon="pi pi-credit-card" class="p-button-sm p-button-success mr-2" (click)="confirmPayment(due, $event)"></button>
                        <button pButton label="Download" icon="pi pi-download" class="p-button-sm p-button-info" (click)="downloadFee(due, $event)"></button>
                    </td>
                    <td *ngIf="due.status === 'Cleared'">
                        <p>
                            No action required. Payment completed on <strong>{{ due.paymentDate }}</strong>
                            <button pButton label="" icon="pi pi-download" class="p-button-sm p-button-info ml-2" (click)="downloadFee(due, $event)"></button>
                        </p>
                    </td>
                </tr>
            </ng-template>
        </p-table>
        <p-confirmDialog></p-confirmDialog>
        <partial-payment-dialog
            [displayPaymentDialog]="displayPaymentDialog"
            [selectedDue]="selectedDue"
            (processPartialPayment)="processPartialPayment($event)"
            (processPayment)="selectedDue && processPayment(selectedDue)"
            (dialogClosed)="displayPaymentDialog = false"
        ></partial-payment-dialog>
        <app-download-dialog-filter (dialogClosed)="displayDownloadDialog = false" [displayDownloadDialog]="displayDownloadDialog"></app-download-dialog-filter>
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
    displayDownloadDialog = false;
    partialPaymentAmount: number = 0;
    selectedDue: PendingDue | null = null;
    paymentType: 'full' | 'partial' = 'partial';
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
        { id: 1, fullname: 'Alice Johnson', course: 'Web Development', totalAmount: 500, restAmount: 500, paidAmount: 0, dueDate: '2025-02-10', status: 'Overdue', paymentDate: '', lastReminder: '2025-02-02' },
        { id: 2, fullname: 'Bob Williams', course: 'Python for AI', totalAmount: 300, restAmount: 300, paidAmount: 0, dueDate: '2025-02-15', status: 'Pending', paymentDate: '', lastReminder: '' },
        { id: 3, fullname: 'Charlie Brown', course: 'Cybersecurity Basics', totalAmount: 450, restAmount: 150, paidAmount: 300, dueDate: '2025-02-20', status: 'Partially Paid', paymentDate: '', lastReminder: '' },
        { id: 4, fullname: 'David Lee', course: 'Data Science', totalAmount: 700, restAmount: 0, paidAmount: 700, dueDate: '2025-02-25', status: 'Cleared', paymentDate: '2025-02-02', lastReminder: '' },
        { id: 5, fullname: 'Emma Wilson', course: 'Machine Learning', totalAmount: 800, restAmount: 400, paidAmount: 400, dueDate: '2025-03-05', status: 'Partially Paid', paymentDate: '2025-02-10', lastReminder: '2025-02-15' },
        { id: 6, fullname: 'Franklin Carter', course: 'Blockchain Fundamentals', totalAmount: 600, restAmount: 600, paidAmount: 0, dueDate: '2025-03-12', status: 'Pending', paymentDate: '', lastReminder: '' },
        { id: 7, fullname: 'Grace Miller', course: 'Cloud Computing', totalAmount: 900, restAmount: 0, paidAmount: 900, dueDate: '2025-02-18', status: 'Cleared', paymentDate: '2025-02-10', lastReminder: '' },
        { id: 8, fullname: 'Henry Adams', course: 'JavaScript Mastery', totalAmount: 550, restAmount: 150, paidAmount: 400, dueDate: '2025-02-28', status: 'Partially Paid', paymentDate: '', lastReminder: '' },
        { id: 9, fullname: 'Isabella Rodriguez', course: 'React & Redux', totalAmount: 750, restAmount: 750, paidAmount: 0, dueDate: '2025-03-08', status: 'Pending', paymentDate: '', lastReminder: '' },
        { id: 10, fullname: 'Jack Thompson', course: 'UI/UX Design', totalAmount: 500, restAmount: 0, paidAmount: 500, dueDate: '2025-02-22', status: 'Cleared', paymentDate: '2025-02-05', lastReminder: '' }
    ]);

    getCurrentDate(): string {
        return new Date().toISOString().slice(0, 10);
    }

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
    sendReminder(user: PendingDue, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Are you sure you want to send a reminder to <b>${user.fullname}</b>?`,
            header: 'Send Reminder',
            icon: 'pi pi-envelope',
            rejectLabel: 'Cancel',
            acceptLabel: 'Yes, Send',
            rejectButtonStyleClass: 'p-button p-button-secondary',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                this.pendingDues.update((dues) => dues.map((due) => (due.id === user.id ? { ...due, lastReminder: this.getCurrentDate() } : due)));
            }
        });
    }

    downloadFee(pendingDue: PendingDue, event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Are you sure you want to download this fee receipt for <b>${pendingDue.fullname}</b>?`,
            header: 'Download Fee Receipt',
            icon: 'pi pi-download',
            rejectLabel: 'Cancel',
            acceptLabel: 'Yes, Download',
            rejectButtonStyleClass: 'p-button p-button-secondary',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                this.generateReceipt(pendingDue);
            }
        });
    }

    generateReceipt(pendingDue: PendingDue) {
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text(`Payment Receipt for ${pendingDue.fullname}`, 14, 20);
    
        const img = new Image();
        img.src = 'assets/images/logo.svg';
    
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/png');
    
            const xPosition = doc.internal.pageSize.width - 40 - 14; 

            doc.addImage(imgData, 'PNG', xPosition, 10, 40, 20);

            autoTable(doc, {
                startY: 30,
                head: [['Field', 'Details']],
                body: [
                    ['Full Name', pendingDue.fullname],
                    ['Course', pendingDue.course],
                    ['Total Amount (TND)', pendingDue.totalAmount.toFixed(2)],
                    ['Paid Amount (TND)', pendingDue.paidAmount.toFixed(2)],
                    ['Remaining Amount (TND)', pendingDue.restAmount.toFixed(2)],
                    ['Due Date', pendingDue.dueDate],
                    ['Payment Date', pendingDue.paymentDate || 'N/A'],
                    ['Status', pendingDue.status]
                ],
                theme: 'grid',
                styles: { fontSize: 12 }
            });
    
            doc.setFontSize(10);
            doc.text('Hichem Abid Platform - ' + this.getCurrentDate(), 14, doc.internal.pageSize.height - 20);
            doc.save(`Payment_Receipt_${pendingDue.fullname}.pdf`);
        };
    }
    

    processPartialPayment(partialPaymentAmount: number) {
        if (!this.selectedDue) {
            this.displayPaymentDialog = false;
            return;
        }
        const { totalAmount, paidAmount, id, paymentDate } = this.selectedDue;
        const newDueAmount = paidAmount + partialPaymentAmount;
        const newStatus = newDueAmount === totalAmount ? 'Cleared' : 'Partially Paid';
        const newPaymentDate = newStatus === 'Cleared' ? this.getCurrentDate() : paymentDate;

        this.pendingDues.update((dues) => dues.map((due) => (due.id === id ? { ...due, paidAmount: newDueAmount, restAmount: totalAmount - newDueAmount, status: newStatus, paymentDate: newPaymentDate } : due)));

        this.partialPaymentAmount = 0;
        this.displayPaymentDialog = false;
    }

    processPayment(user: PendingDue) {
        user.status = 'Cleared';
        user.paymentDate = this.getCurrentDate();
        if (this.displayPaymentDialog) {
            this.displayPaymentDialog = false;
        }
    }
    openDownloadDial(){
        this.displayDownloadDialog = true;
    }
}
