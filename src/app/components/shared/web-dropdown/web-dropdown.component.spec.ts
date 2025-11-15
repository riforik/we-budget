import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDropdownComponent } from './web-dropdown.component';

describe('WebDropdownComponent', () => {
  let component: WebDropdownComponent;
  let fixture: ComponentFixture<WebDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
