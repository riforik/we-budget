import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import Papa from 'papaparse';

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent implements OnInit {
  previewData: any[] = [];
  parseErrors: string[] = [];
  @Output() fileParsed = new EventEmitter<any[]>();

  constructor(private http: HttpClient, private auth: AuthService) {}
  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const rows = results.data as any[];
        const errors = results.errors;

        this.parseErrors = errors.map((e: { message: any }) => e.message);

        // Sanitize + validate rows immediately
        this.previewData = rows
          .map((r) => this.cleanRow(r))
          .filter((r) => this.validateRow(r));
        this.fileParsed.emit(this.previewData);
      },
    });
  }

  cleanRow(row: any) {
    const cleaned: any = {};

    for (const key in row) {
      let value = row[key];

      // Protect against CSV formula injection
      if (typeof value === 'string' && /^[=+\-@]/.test(value)) {
        value = "'" + value;
      }

      cleaned[key] = value;
    }

    return cleaned;
  }

  validateRow(row: any) {
    if (!row.date || isNaN(Date.parse(row.date))) return false;
    if (isNaN(Number(row.amount))) return false;

    return true;
  }
}
