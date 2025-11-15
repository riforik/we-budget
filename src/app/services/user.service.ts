// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface DBUser {
  id: number;
  auth0_id: string;
  email: string;
  name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  /** Syncs Auth0 user to DB (creates or returns existing user) */
  syncUserWithDB(): Observable<DBUser | null> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return this.http.post<DBUser>('/api/sync-user', {
          userId: user.sub,
          email: user.email,
          name: user.name,
        });
      })
    );
  }
}
