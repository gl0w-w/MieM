import { ComponentFixture, TestBed } from '@angular/core/testing';
import { emprPage } from './empr.page';

describe('emprPage', () => {
  let component: emprPage;
  let fixture: ComponentFixture<emprPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(emprPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
