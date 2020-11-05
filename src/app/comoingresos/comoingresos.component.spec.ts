import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoingresosComponent } from './comoingresos.component';

describe('ComoingresosComponent', () => {
  let component: ComoingresosComponent;
  let fixture: ComponentFixture<ComoingresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComoingresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoingresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
