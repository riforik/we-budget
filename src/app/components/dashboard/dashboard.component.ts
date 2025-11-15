import { Component, OnInit } from '@angular/core';
import { LogoutButtonComponent } from 'src/app/components/logout-button.component';
import { ProfileComponent } from 'src/app/components/profile.component';
import { UserService, DBUser } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/iLoveData.service';
import { Category } from 'src/app/constants/category.config';
import { WebDropdownComponent } from '../shared/web-dropdown/web-dropdown.component';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutButtonComponent, ProfileComponent, WebDropdownComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dbUser: DBUser | null = null;
  loading = true;
  error: string | null = null;
  categories: Category[] = [];

  constructor(
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.userService.syncUserWithDB().subscribe({
      next: (user) => {
        this.dbUser = user;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error syncing user:', err);
        this.error = 'Failed to load user data';
        this.loading = false;
      },
    });

    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error fetching categories:', err),
    });
  }
}
