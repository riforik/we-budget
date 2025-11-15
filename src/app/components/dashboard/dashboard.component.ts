import { Component, OnInit, ViewChild } from '@angular/core';
import { LogoutButtonComponent } from 'src/app/components/logout-button.component';
import { ProfileComponent } from 'src/app/components/profile.component';
import { UserService, DBUser } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/iLoveData.service';
import { Category } from 'src/app/constants/category.config';
import { WebDropdownComponent } from '../shared/web-dropdown/web-dropdown.component';
import { FileInputComponent } from '../shared/inputs/file-input/file-input.component';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    LogoutButtonComponent,
    ProfileComponent,
    WebDropdownComponent,
    FileInputComponent,
    DialogComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dbUser: DBUser | null = null;
  loading = true;
  error: string | null = null;
  categories: Category[] = [];
  showDialog = false;
  previewData: any[] = [];
  @ViewChild(DialogComponent)
  previewDialog!: DialogComponent;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.userService.syncUserWithDB().subscribe({
      next: (user) => {
        this.dbUser = user;
        console.log(this.dbUser);
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

  onCsvParsed(data: any[]) {
    this.previewData = data;
    this.previewDialog.open(data);
  }
}
