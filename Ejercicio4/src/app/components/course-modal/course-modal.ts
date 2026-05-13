import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course/course-service';
import { ICourse } from '../../core/interfaces/ICourse';

@Component({
  selector: 'app-course-modal',
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './course-modal.html',
  styleUrl: './course-modal.scss',
  standalone: true,
})
export class CourseModal implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  courseService = inject(CourseService);
  dialogRef = inject(MatDialogRef<CourseModal>);
  private destroyRef = inject(DestroyRef);

  courseData = signal<Partial<ICourse>>({
    id: '',
    name: '',
    description: '',
    level: '',
    instructor: '',
    createdAt: new Date(),
  });

  ngOnInit() {
    if (this.data?.id) {
      this.courseService.getCourseById(this.data.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (course) => this.courseData.set(course),
          error: (err) => console.error(err)
        });
    }
  }

  saveCourse(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.courseData().id) {
      this.courseService.updateCourse(this.courseData().id!, this.courseData() as ICourse)
        .subscribe({
          next: (updatedCourse) => {
            console.log('Curso actualizado:', updatedCourse);
            this.dialogRef.close({ updated: true });
          },
          error: (err) => {
            console.error('Error al actualizar:', err);
            this.dialogRef.close({ updated: false, error: err });
          }
        });
    } else {
      this.courseService.saveCourse(this.courseData() as ICourse)
        .subscribe({
          next: (newCourse) => {
            console.log('Curso creado:', newCourse);
            this.dialogRef.close({ updated: true });
          },
          error: (err) => {
            console.error('Error al crear:', err);
            this.dialogRef.close({ updated: false, error: err });
          }
        });
    }
  }

  closeModal() {
    this.dialogRef.close({ updated: false });
  }

  updateField<K extends keyof ICourse>(field: K, value: ICourse[K]) {
    this.courseData.update(course => ({
      ...course,
      [field]: value
    }));
  }
}
