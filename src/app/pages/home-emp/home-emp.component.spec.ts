import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeEmpComponent } from './home-emp.component';

describe('HomeEmpComponent', () => {
  let component: HomeEmpComponent;
  let fixture: ComponentFixture<HomeEmpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
