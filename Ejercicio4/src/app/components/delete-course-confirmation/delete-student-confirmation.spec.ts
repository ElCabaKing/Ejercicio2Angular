import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourseConfirmation } from './delete-course-confirmation';

describe('DeleteStudentConfirmation', () => {
  let component: DeleteCourseConfirmation;
  let fixture: ComponentFixture<DeleteCourseConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCourseConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCourseConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
