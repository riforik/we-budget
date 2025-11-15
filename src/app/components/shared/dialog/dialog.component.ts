import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { WebDropdownComponent } from 'src/app/components/shared/web-dropdown/web-dropdown.component';

@Component({
  selector: 'app-dialog',
  imports: [WebDropdownComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  visible = false;
  @Input() csvData: any;
  @Input() categories: any;
  data: any[] = [];
  columns: any[] = [];
  @ViewChild('myDialog') myDialog!: ElementRef<HTMLDialogElement>;

  dialogEle = document.querySelector('#dialog');

  open(data: any[]) {
    this.data = data;
    this.columns = this.getColumns();
    this.myDialog.nativeElement.showModal();
    this.visible = true;
    console.log(this.data);
  }

  close() {
    this.myDialog.nativeElement.close();
    this.visible = false;
  }

  getColumns(): string[] {
    return this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }
}
