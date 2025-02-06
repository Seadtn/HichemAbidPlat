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
    <div>
      <p-table [value]="discounts()" [paginator]="true" [rows]="5">
        <ng-template pTemplate="header">
          <tr>
            <th>Discount Name</th>
            <th>Type</th>
            <th>Discount (%)</th>
            <th>Expiry Date</th>
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
              <button pButton label="Apply" icon="pi pi-check" class="p-button-sm p-button-success"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class DiscountsComponent {
  discounts: Signal<any[]> = signal([
    { name: 'Early Bird Offer', type: 'Early Payment', percentage: 10, expiry: '2025-02-15' },
    { name: 'Scholarship Grant', type: 'Scholarship', percentage: 20, expiry: '2025-06-30' },
  ]);

  getTagSeverity(type: string) {
    return type === 'Scholarship' ? 'secondary' : type === 'Early Payment' ? 'success' : 'info';
  }
}
