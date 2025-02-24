import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  template: `
  <div class="card">
      <p-table [value]="discounts()" [paginator]="true" [rows]="10">
        <ng-template pTemplate="header">
        <tr>
            <th>Discount Name</th>
            <th>Type</th>
            <th>Discount (%)</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Courses</th>
            <th>Actions</th>
        </tr>
        </ng-template>

        <ng-template pTemplate="body" let-discount>
          <tr>
            <td>{{ discount.name }}</td>
            <td>
              <p-tag [value]="discount.type" [severity]="getTagSeverity(discount.type)"></p-tag>
            </td>
            <td class="font-semibold">{{ discount.percentage }}%</td>
            <td>{{ discount.expiry }}</td>
            <td>
              <p-tag [value]="discount.status" [severity]="getStatusSeverity(discount.status)"></p-tag>
            <td *ngIf="discount.courses.length > 0">{{ discount.courses.join(', ') }}</td>
            <td *ngIf="discount.courses.length === 0">This discount is not applied to any course</td>
            <td>
                <button *ngIf="discount.status !== 'Active'" pButton label="Apply" icon="pi pi-check" class="p-button-sm p-button-success"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class DiscountsComponent {
 discounts: Signal<any[]> = signal([
    { name: 'Early Bird Offer', type: 'Early Payment', percentage: 10, expiry: '2025-02-15', status: "Active", courses: ['English Beginner', 'French Intermediate'] },
    { name: 'Scholarship Grant', type: 'Scholarship', percentage: 20, expiry: '2025-06-30', status: "Inactive", courses: [] },
    { name: 'Loyalty Discount', type: 'Returning Student', percentage: 5, expiry: '2025-12-31', status: "Inactive", courses: [] },
    { name: 'Group Enrollment Discount', type: 'Group Registration', percentage: 15, expiry: '2025-09-30', status: "Active", courses: ['Italian Advanced', ] },
    { name: 'Referral Bonus', type: 'Referral', percentage: 10, expiry: '2025-07-31', status: "Inactive", courses: ['English Advanced', 'French Beginner'] },
    { name: 'New Student Offer', type: 'First-time Enrollment', percentage: 8, expiry: '2025-04-30', status: "Active", courses: ['German Intermediate', 'Spanish Beginner'] },
    { name: 'Seasonal Promotion', type: 'Holiday Discount', percentage: 12, expiry: '2025-12-25', status: "Inactive", courses: [] },
    { name: 'Corporate Partnership Discount', type: 'Corporate Employee', percentage: 10, expiry: '2025-11-30', status: "Active", courses: ['Business English', 'French for Professionals'] },
    { name: 'Family Package Discount', type: 'Multiple Family Members', percentage: 18, expiry: '2025-08-31', status: "Inactive", courses: [] },
    { name: 'Weekend Special', type: 'Weekend Course', percentage: 7, expiry: '2025-05-31', status: "Active", courses: ['Weekend French'] },
    { name: 'Student Discount', type: 'Student ID Required', percentage: 10, expiry: '2025-06-30', status: "Inactive", courses: ['University English', 'Academic Writing'] },
    { name: 'Senior Citizen Discount', type: 'Elderly Learners', percentage: 15, expiry: '2025-10-31', status: "Active", courses: ['Basic Spanish', 'Conversational English'] },
    { name: 'Military or Veteran Discount', type: 'Service Member', percentage: 20, expiry: '2025-12-31', status: "Inactive", courses: [] },
    { name: 'Bundle Course Discount', type: 'Multiple Courses', percentage: 25, expiry: '2025-09-30', status: "Active", courses: ['Complete English Package'] },
    { name: 'Trial Class Discount', type: 'Trial Session', percentage: 5, expiry: '2025-03-31', status: "Inactive", courses: [] }
 ]);



  getTagSeverity(type: string) {
    return type === 'Scholarship' ? 'secondary' : type === 'Early Payment' ? 'success' : 'info';
  }
  getStatusSeverity(status: string) {
    return status === 'Active' ? 'success' : 'danger';
  }
}
