import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlightModal } from './new-flight-modal';

describe('NewFlightModal', () => {
  let component: NewFlightModal;
  let fixture: ComponentFixture<NewFlightModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFlightModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFlightModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
