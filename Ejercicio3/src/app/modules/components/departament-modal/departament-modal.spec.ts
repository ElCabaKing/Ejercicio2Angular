import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentModal } from './departament-modal';

describe('DepartamentModal', () => {
  let component: DepartamentModal;
  let fixture: ComponentFixture<DepartamentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartamentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
