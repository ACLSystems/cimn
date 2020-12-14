import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraciasingresosComponent } from './graciasingresos.component';

describe('GraciasingresosComponent', () => {
  let component: GraciasingresosComponent;
  let fixture: ComponentFixture<GraciasingresosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraciasingresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraciasingresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
