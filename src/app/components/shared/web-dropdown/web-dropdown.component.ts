import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-dropdown',
  templateUrl: './web-dropdown.component.html',
  styleUrl: './web-dropdown.component.css',
})
export class WebDropdownComponent implements OnInit {
  @Input() dataArgs: { id: number; name: string }[] = []; // <- declare Input
  ngOnInit(): void {}
}
