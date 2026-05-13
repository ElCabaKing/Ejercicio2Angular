import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../services/student/student-service';

@Component({
  selector: 'app-delete-student-confirmation',
  imports: [MatDialogModule],
  templateUrl: './delete-student-confirmation.html',
  styleUrl: './delete-student-confirmation.scss',
})
export class DeleteStudentConfirmation {
  data = inject(MAT_DIALOG_DATA);
  studentService = inject(StudentService);
  dialogRef = inject(MatDialogRef<DeleteStudentConfirmation>);

  deleteStudent() {
    this.studentService.deleteStudent(this.data.id).subscribe({
      next: () => {
        console.log('Estudiante eliminado');
        this.dialogRef.close({ updated: true });
      },
      error: (err) => console.error('Error al eliminar estudiante:', err)
    });
  }

  closeModal() {
    this.dialogRef.close({
      updated: false
    });
  }
}
