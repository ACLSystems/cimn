import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMainCardComponent } from './blog-main-card.component';

describe('BlogMainCardComponent', () => {
  let component: BlogMainCardComponent;
  let fixture: ComponentFixture<BlogMainCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogMainCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
