import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCuotasComponent } from './ver-cuotas.component';

describe('VerCuotasComponent', () => {
  let component: VerCuotasComponent;
  let fixture: ComponentFixture<VerCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
