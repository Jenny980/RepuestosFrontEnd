import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngresoBodegaComponent } from './new-ingreso-bodega.component';

describe('NewIngresoBodegaComponent', () => {
  let component: NewIngresoBodegaComponent;
  let fixture: ComponentFixture<NewIngresoBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIngresoBodegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIngresoBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
