import { Component, Signal, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div>
      <h3 class="text-xl font-semibold mb-4">📊 Payment & Dues Reports</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Fee Collection Trend Chart -->
        <div class=" p-4 shadow-lg rounded-lg ">
          <h4 class="text-lg font-semibold ">💰 Fee Collection Trend</h4>
          <p-chart type="line" [data]="feeCollectionData()" [options]="chartOptions"></p-chart>
        </div>

        <!-- Pending vs. Cleared Payments Chart -->
        <div class=" p-4 shadow-lg rounded-lg">
          <h4 class="text-lg font-semibold ">📉 Pending vs. Cleared Payments</h4>
          <p-chart type="pie" [data]="paymentStatusData()" [options]="chartOptions"></p-chart>
        </div>
      </div>
    </div>
  `
})
export class ReportsComponent implements OnInit {
  feeCollectionData!: Signal<any>;
  paymentStatusData!: Signal<any>;
  chartOptions: any;

  ngOnInit() {
    this.initializeCharts();
  }

  initializeCharts() {
    this.feeCollectionData = signal({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Fees Collected ($)',
          data: [1200, 1900, 3000, 2500, 3200, 4000], // Dynamic fee collection data
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2,
          fill: true
        }
      ]
    });

    this.paymentStatusData = signal({
      labels: ['Cleared', 'Pending', 'Overdue'],
      datasets: [
        {
          data: [60, 25, 15], // 60% cleared, 25% pending, 15% overdue
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
          hoverBackgroundColor: ['#388E3C', '#FFA000', '#D32F2F']
        }
      ]
    });

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
