import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APIURL } from 'src';
import { PaidFee } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AdminhomeService {
  private http = inject(HttpClient);
  constructor() {}

  async getTotalFees(): Promise<PaidFee[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<PaidFee[]>(`${APIURL}PaidFees/GetAllFees`)
      );
      return data;
    } catch (error) {
      console.error('Error fetching  Paid fees:', error);
      throw error; // Rethrow or handle the error appropriately
    }
  }

  calculateMonthlyIncome(paidFees: PaidFee[]): Record<string, number> {
    return paidFees.reduce((monthlyIncome, fee) => {
      const date = new Date(fee.createdat);
      // Extract the year and month from the createdat date
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}`;

      // Initialize the month's income if not already set
      if (!monthlyIncome[yearMonth]) {
        monthlyIncome[yearMonth] = 0;
      }

      // Add the feeamount to the respective month, if feeamount is valid
      monthlyIncome[yearMonth] += fee.feeamount ?? 0;

      return monthlyIncome;
    }, {} as Record<string, number>);
  }
}
