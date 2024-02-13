import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCuotaComponent } from './new-cuota.component';

describe('NewCuotaComponent', () => {
  let component: NewCuotaComponent;
  let fixture: ComponentFixture<NewCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
