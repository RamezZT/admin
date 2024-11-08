import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { AdminhomeService } from './adminhome.service';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from 'chart.js'; // Import scales and controllers
import { injectQuery } from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

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
  totalIncomeQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.totalincome],
    queryFn: () => this.adminHomeService.getTotalIncome(),
  }));
  librariesSalesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.librariesSales],
    queryFn: () => this.adminHomeService.getLibrariesSales(),
  }));

  // Store the selected month for updating the chart
  selectedMonth: string = '2023-03';

  get paidFees() {
    return this.paidFeesQuery.data();
  }

  // Get the paid fees data
  get last5Fees() {
    const fees = this.paidFeesQuery.data()?.slice(0, 5);
    return fees;
  }

  get totalIncome() {
    return this.totalIncomeQuery.data();
  }

  get librariesSales() {
    return this.librariesSalesQuery.data();
  }

  // Calculate monthly income from the paid fees
  get monthlyIncome() {
    if (!this.paidFees) return {};
    const data = this.adminHomeService.calculateMonthlyIncome(this.paidFees);
    return data;
  }

  get totalFees() {
    const paidFees = this.paidFeesQuery.data();
    const totalIncome = paidFees?.reduce((acc, fee) => acc + fee.feeamount!, 0);
    return totalIncome;
  }

  // The chart reference
  private chart: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initial chart rendering
    this.updateChart();
  }

  // Function to update the chart based on the selected month
  updateChart() {
    const monthlyIncome = this.monthlyIncome;
    const selectedIncome = monthlyIncome[this.selectedMonth] || 0;

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx) {
      // Destroy the existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
      }

      // Create a new Chart.js chart
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [this.selectedMonth],
          datasets: [
            {
              label: 'Income',
              data: [selectedIncome],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: 'linear', // Explicitly set the scale type
              beginAtZero: true,
              ticks: {
                stepSize: 100,
              },
            },
          },
        },
      });
    }
  }
}
