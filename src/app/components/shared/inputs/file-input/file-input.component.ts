import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) {}
  ngOnInit(): void {}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post('/api/upload-csv', formData).subscribe({
      next: (res) => console.log('Upload successful', res),
      error: (err) => console.error('Upload failed', err),
    });
  }
}
