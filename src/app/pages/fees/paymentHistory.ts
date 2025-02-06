import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, BreadcrumbModule],
  template: `
  <div class="card">
  <p-breadcrumb [model]="items"></p-breadcrumb>
    <p-table [value]="paymentHistory()" [paginator]="true" [rows]="5">
      <ng-template pTemplate="header">
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Payment Date</th>
          <th>Actions</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-payment>
        <tr>
          <td>{{ payment.studentName }}</td>
          <td>{{ payment.course }}</td>
          <td>{{ payment.amount }}</td>
          <td>{{ payment.date }}</td>
          <td>
            <button pButton label="Download Receipt" icon="pi pi-download" class="p-button-sm p-button-info"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
    </div>
  `
})
export class PaymentHistoryComponent {
  paymentHistory: Signal<any[]> = signal([
    { studentName: 'Alice', course: 'Web Dev', amount: 500, date: '2025-01-10' },
    { studentName: 'Bob', course: 'Python', amount: 300, date: '2025-01-15' },
  ]);
  items: MenuItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Payment History', url: '/dashboard/fees/payment-history' }
  ];
}
