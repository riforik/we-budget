import { OnInit, Component } from '@angular/core';
import { LogoutButtonComponent } from 'src/app/components/logout-button.component';
import { ProfileComponent } from 'src/app/components/profile.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutButtonComponent, ProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        console.log('Auth0 user ID:', user.sub);
        // Send this user ID to backend
      }
    });
  }
}
