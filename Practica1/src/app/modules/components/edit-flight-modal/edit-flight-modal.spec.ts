import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlightModal } from './edit-flight-modal';

describe('EditFlightModal', () => {
  let component: EditFlightModal;
  let fixture: ComponentFixture<EditFlightModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFlightModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFlightModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
