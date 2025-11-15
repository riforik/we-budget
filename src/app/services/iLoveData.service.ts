import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import mockCategories from 'src/assets/json/mock/mock-categories.json';
import { Category } from '../constants/category.config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    if (environment.useMockUser) {
      console.log('Using mock categories');
      return of(mockCategories as Category[]);
    }

    // Replace with your actual backend endpoint
    return this.http.get<Category[]>('/api/get-categories');
  }
}
