import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { AdminhomeService } from './adminhome.service';
import { Chart } from 'chart.js';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';

@Component({
  selector: 'app-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  adminHomeService = inject(AdminhomeService);

  // Fetching paid fees dynamically
  paidFeesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.paidfees],
    queryFn: () => this.adminHomeService.getTotalFees(),
  }));

  // Store the selected month for updating the chart
  selectedMonth: string = '2023-03';

  // Get the paid fees data
  get paidFees() {
    return this.paidFeesQuery.data();
  }

  // Calculate monthly income from the paid fees
  get monthlyIncome() {
    if (!this.paidFees) return {};
    const data = this.adminHomeService.calculateMonthlyIncome(this.paidFees);
    console.log(data); // Example: { "2023-03": 500, "2023-04": 600, ... }
    return data;
  }

  get totalIncome() {
    const chartContainer = document.getElementById('chart')!;
    console.log(chartContainer);
    const paidFees = this.paidFeesQuery.data();
    this.monthlyIncome;
    const totalIncome = paidFees?.reduce((acc, fee) => acc + fee.feeamount!, 0);
    return totalIncome;
  }

  // The chart reference
  private chart: any;

  ngOnInit(): void {
    // Initialize the chart when the component is first loaded
    this.updateChart();
  }

  ngAfterViewInit(): void {
    // Initial chart rendering
    this.updateChart();
  }

  // Function to update the chart based on the selected month
  updateChart() {
    const monthlyIncome = this.monthlyIncome;

    // Get the income for the selected month (e.g., '2023-03')
    const selectedIncome = monthlyIncome[this.selectedMonth] || 0;

    // Get the chart container (canvas element) and cast it to HTMLCanvasElement
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    ctx.getContext('2d');

    if (ctx) {
      // Destroy the existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
      }

      // Create a new Chart.js chart
      this.chart = new Chart(ctx, {
        type: 'bar', // You can change the chart type (e.g., 'line', 'bar', etc.)
        data: {
          labels: [this.selectedMonth], // x-axis label (for example: '2023-03')
          datasets: [
            {
              label: 'Income',
              data: [selectedIncome], // y-axis value (the income for the selected month)
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 100, // Adjust this step size according to your data range
              },
            },
          },
        },
      });
    }
  }
}
