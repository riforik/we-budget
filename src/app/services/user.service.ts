import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface DBUser {
  id: number;
  auth0_id: string;
  email: string;
  name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root', // ensures Angular can inject this service
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  syncUserWithDB(): Observable<DBUser | null> {
    if (environment.useMockUser) {
      return this.http.get<DBUser>('assets/json/mock/account-01.json');
    } else {
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
}
