import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailvalidateComponent } from './emailvalidate.component';

describe('EmailvalidateComponent', () => {
  let component: EmailvalidateComponent;
  let fixture: ComponentFixture<EmailvalidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailvalidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailvalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
