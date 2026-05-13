import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentModal } from './student-modal';

describe('StudentModal', () => {
  let component: StudentModal;
  let fixture: ComponentFixture<StudentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentModal],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
