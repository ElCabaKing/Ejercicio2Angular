import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudentConfirmation } from './delete-student-confirmation';

describe('DeleteStudentConfirmation', () => {
  let component: DeleteStudentConfirmation;
  let fixture: ComponentFixture<DeleteStudentConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteStudentConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteStudentConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
