import { OnInit, Component } from '@angular/core';
import { LogoutButtonComponent } from 'src/app/components/logout-button.component';
import { ProfileComponent } from 'src/app/components/profile.component';
import { AuthService } from '@auth0/auth0-angular';
import { UserService, DBUser } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutButtonComponent, ProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private auth: AuthService, private userService: UserService) {}

  title = 'angular-test';
  dbUser: DBUser | null = null; // will store the DB user

  ngOnInit() {
    this.userService.syncUserWithDB().subscribe({
      next: (user) => {
        if (user) {
          this.dbUser = user; // store the DB user for use in your template
          console.log('DB user:', user);
        }
      },
      error: (err) => {
        console.error('Error syncing user:', err);
      },
    });
  }
}
