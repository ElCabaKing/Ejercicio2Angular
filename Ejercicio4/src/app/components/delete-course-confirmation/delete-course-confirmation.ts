import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../services/course/course-service';

@Component({
  selector: 'app-delete-course-confirmation',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-course-confirmation.html',
  styleUrl: './delete-course-confirmation.scss',
  standalone: true
})
export class DeleteCourseConfirmation {
  data = inject(MAT_DIALOG_DATA);
  courseService = inject(CourseService);
  dialogRef = inject(MatDialogRef<DeleteCourseConfirmation>);

  deleteCourse() {
    this.courseService.deleteCourse(this.data.id).subscribe({
      next: () => {
        console.log('Curso eliminado');
        this.dialogRef.close({ updated: true });
      },
      error: (err) => console.error('Error al eliminar curso:', err)
    });
  }

  closeModal() {
    this.dialogRef.close({ updated: false });
  }
}
