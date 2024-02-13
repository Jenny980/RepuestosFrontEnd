import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalidaBodegaComponent } from './new-salida-bodega.component';

describe('NewSalidaBodegaComponent', () => {
  let component: NewSalidaBodegaComponent;
  let fixture: ComponentFixture<NewSalidaBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSalidaBodegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSalidaBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
