import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrestamoComponent } from './new-prestamo.component';

describe('NewPrestamoComponent', () => {
  let component: NewPrestamoComponent;
  let fixture: ComponentFixture<NewPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
