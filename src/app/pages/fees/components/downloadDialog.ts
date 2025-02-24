import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { PendingDue } from '../../../../Data/global';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-download-dialog-filter',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, DropdownModule, CalendarModule, FormsModule],
    template: `
        <p-dialog [(visible)]="displayDownloadDialog" header="Download Filter" [modal]="true" [closable]="false" class="rounded-lg shadow-lg">
            <div class="p-fluid space-y-6">
                <div class="p-field grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <div>
                        <label for="format" class="block font-semibold text-gray-700 mb-1">Download Format</label>
                        <p-dropdown class="w-[15rem]" id="format" [options]="downloadFormats" [(ngModel)]="selectedFormat" placeholder="Select Format"></p-dropdown>
                    </div>
                    <div>
                        <label for="status" class="block font-semibold text-gray-700 mb-1">Status</label>
                        <p-dropdown class="w-[15rem]" id="status" [options]="statusOptions" [(ngModel)]="selectedStatus" placeholder="Select Status"></p-dropdown>
                    </div>
                </div>

                <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">Due Date</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="startDate" class="block font-medium text-gray-600 mb-1">Start Date</label>
                            <p-calendar id="startDate" [(ngModel)]="startDate" dateFormat="yy-mm-dd" showIcon class="w-full"></p-calendar>
                        </div>
                        <div>
                            <label for="endDate" class="block font-medium text-gray-600 mb-1">End Date</label>
                            <p-calendar id="endDate" [(ngModel)]="endDate" [minDate]="startDate" [disabled]="!startDate" dateFormat="yy-mm-dd" showIcon class="w-full"></p-calendar>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">Payment Date</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="paymentStartDate" class="block font-medium text-gray-600 mb-1">Start Date</label>
                            <p-calendar id="paymentStartDate" [(ngModel)]="paymentStartDate" dateFormat="yy-mm-dd" showIcon class="w-full"></p-calendar>
                        </div>
                        <div>
                            <label for="paymentEndDate" class="block font-medium text-gray-600 mb-1">End Date</label>
                            <p-calendar id="paymentEndDate" [(ngModel)]="paymentEndDate" [minDate]="paymentStartDate" [disabled]="!paymentStartDate" dateFormat="yy-mm-dd" showIcon class="w-full"> </p-calendar>
                        </div>
                    </div>
                </div>
            </div>

            <ng-template pTemplate="footer">
                <div class="flex justify-end gap-3">
                    <button pButton label="Cancel" icon="pi pi-times" class="p-button-text text-gray-500" (click)="closeDialog()"></button>
                    <button pButton label="Download" icon="pi pi-download" class="p-button-primary px-4 py-2 rounded-lg shadow-md" (click)="confirmDownload()" [disabled]="!selectedFormat"></button>
                </div>
            </ng-template>
        </p-dialog>
    `
})
export class DownloadDialogFilterComponent {
    @Input() displayDownloadDialog: boolean = false;
    @Output() dialogClosed = new EventEmitter<void>();
    @Output() downloadConfirmed = new EventEmitter<{ format: string; status: string | null; dueDate: { startDate: Date | null; endDate: Date | null }; paymentDate: { startDate: Date | null; endDate: Date | null } }>();

    selectedStatus: string | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;
    selectedFormat: string | null = null;
    paymentStartDate: Date | null = null;
    paymentEndDate: Date | null = null;
    statusOptions = [
        { label: 'All', value: null },
        { label: 'Overdue', value: 'Overdue' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Partially Paid', value: 'Partially Paid' },
        { label: 'Cleared', value: 'Cleared' }
    ];

    downloadFormats = [
        { label: 'PDF', value: 'pdf' },
        { label: 'CSV', value: 'csv' },
    ];

    closeDialog() {
        this.displayDownloadDialog = false;
        this.dialogClosed.emit();
    }

    confirmDownload() {
        let filteredDues = this.pendingDues().filter((due) => {

            let statusMatch = true;
            let dueDateMatch = true;
            let paymentDateMatch = true;
            
            if (this.selectedStatus) {
             statusMatch = this.selectedStatus ? due.status === this.selectedStatus : true;
        }
    

    
            if (this.startDate || this.endDate) {
                dueDateMatch = (!this.startDate || new Date(due.dueDate) >= this.startDate) &&
                               (!this.endDate || new Date(due.dueDate) <= this.endDate);
            }
    
            if (this.paymentStartDate || this.paymentEndDate) {
                paymentDateMatch = (!this.paymentStartDate || new Date(due.paymentDate) >= this.paymentStartDate) &&
                                   (!this.paymentEndDate || new Date(due.paymentDate) <= this.paymentEndDate);
            }
    
            return statusMatch && dueDateMatch && paymentDateMatch;
        });

        if (this.selectedFormat === 'csv') {
            this.downloadCSV(filteredDues);
        } else if (this.selectedFormat === 'pdf') {
            this.downloadPDF(filteredDues);
        }

        this.closeDialog();
    }

    downloadPDF(filteredDues: any[]) {
        const doc = new jsPDF();

        const columns = [
            { header: 'ID', dataKey: 'id' },
            { header: 'Full Name', dataKey: 'fullname' },
            { header: 'Course', dataKey: 'course' },
            { header: 'Total Amount', dataKey: 'totalAmount' },
            { header: 'Rest Amount', dataKey: 'restAmount' },
            { header: 'Paid Amount', dataKey: 'paidAmount' },
            { header: 'Due Date', dataKey: 'dueDate' },
            { header: 'Status', dataKey: 'status' },
            { header: 'Payment Date', dataKey: 'paymentDate' },
            { header: 'Last Reminder', dataKey: 'lastReminder' }
        ];
        
        const rows = filteredDues.map((due) => ([
            due.id,
            due.fullname,
            due.course,
            due.totalAmount,
            due.restAmount,
            due.paidAmount,
            due.dueDate,
            due.status,
            due.paymentDate || 'N/A',
            due.lastReminder || 'N/A'
        ]));

        autoTable(doc, {
            head: [columns.map((col) => col.header)],
            body: rows,
            startY: 30,
            theme: 'grid'
        });

        doc.save('filtered_pending_dues.pdf');
    }
    downloadCSV(filteredDues: any[]) {
        let csvContent = 'ID, Full Name, Course, Total Amount, Rest Amount, Paid Amount, Due Date, Status, Payment Date, Last Reminder\n';
        filteredDues.forEach((due) => {
            csvContent += `${due.id}, ${due.fullname}, ${due.course}, ${due.totalAmount}, ${due.restAmount}, ${due.paidAmount}, ${due.dueDate}, ${due.status}, ${due.paymentDate}, ${due.lastReminder}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'filtered_pending_dues.csv';
        link.click();
    }
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
}
