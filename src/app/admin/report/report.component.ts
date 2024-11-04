import { Component } from '@angular/core';
import { BorrowedBooksService } from '../borrowed-books/borrowed-books.service';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from '../../queries';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BorrowedBook, Report } from 'src/types';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  reportType: string = 'ANNUAL'; // Default report type
  reportYear: string = '';
  reportMonth: string = '';
  reportsData = [] as Report[];
  constructor(private borrowedBooksService: BorrowedBooksService) {}

  reportsMutation = injectMutation((client) => ({
    mutationKey: [
      QUERYKEYS.report,
      this.reportType,
      this.reportYear,
      this.reportType === 'MONTHLY' ? this.reportMonth : '',
    ],
    mutationFn: async () => {
      const reports = await this.borrowedBooksService.getReports(
        this.reportType,
        this.reportYear,
        this.reportType === 'MONTHLY' ? this.reportMonth : ''
      );
      return reports;
    },
    onSuccess: (data) => {
      console.log('fetching succesfully');
      console.log(data);
      client.setQueryData(
        [
          QUERYKEYS.report,
          this.reportType,
          this.reportYear,
          this.reportType === 'MONTHLY' ? this.reportMonth : '',
        ],
        data
      );
    },
  }));

  async fetchReport() {
    try {
      const data = (await this.reportsMutation.mutateAsync()) as Report[];
      this.reportsData = data;
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  }
  async downloadPDF() {
    const dataElement = document.getElementById('reportTable');
    if (dataElement) {
      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Add the heading
      const heading =
        `${this.reportType} Report for ${this.reportYear}` +
        (this.reportType === 'MONTHLY' ? ` - ${this.reportMonth}` : '');
      pdf.setFontSize(20);
      pdf.text(heading, 10, 20); // Position (x, y) on the PDF

      // Use html2canvas to create a canvas of the table without colors
      const canvas = await html2canvas(dataElement, { backgroundColor: null });
      const imgWidth = 190; // PDF width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imageData = canvas.toDataURL('image/png');

      // Add the image of the table to the PDF
      pdf.addImage(imageData, 'PNG', 10, 30, imgWidth, imgHeight);
      pdf.save(`report_${this.reportType}_${this.reportYear}.pdf`);
    }
  }

  // get reportData() {
  //   console.log(this.reportsQuery.data());
  //   return this.reportsQuery.data() ?? [];
  // }
}
