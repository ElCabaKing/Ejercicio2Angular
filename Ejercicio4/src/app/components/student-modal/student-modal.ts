
import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../services/student/student-service';
import { IStudent } from '../../core/interfaces/IStudent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-student-modal',
  imports: [MatDialogModule, MatFormFieldModule,
    FormsModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './student-modal.html',
  styleUrl: './student-modal.scss',
  standalone: true
})
export class StudentModal implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  studentService = inject(StudentService);
  dialogRef = inject(MatDialogRef<StudentModal>);
  private destroyRef = inject(DestroyRef);

  studentData = signal<Partial<IStudent>>({
    id: '',
    name: '',
    email: '',
    avatar: '',
    courseId: 'b9450c3aa143c3c8b5bd4102',
  });

  ngOnInit() {
    if (this.data?.id) {
      console.log('Cargando datos del estudiante con ID:', this.data.id);
      this.studentService.getStudentById(this.data.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (student) => {
            this.studentData.set(student);
            console.log(student);
          },
          error: (err) => console.error(err)
        });
    }
  }


  saveStudent(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log('Guardando estudiante con ID:', this.studentData().id);
    if (this.studentData().id) {
      this.studentService.updateStudent(this.studentData().id!, this.studentData() as IStudent)
        .subscribe({
          next: (updatedStudent) => {
            console.log('Estudiante actualizado:', updatedStudent);
            this.dialogRef.close({
              updated: true
            });
          },
          error: (err) => {
            console.error('Error al actualizar:', err);
            this.dialogRef.close({
              updated: false,
              error: err
            });
          }
        });
    } else {
      this.studentService.saveStudent(this.studentData() as IStudent)
        .subscribe({
          next: (newStudent) => {
            console.log('Estudiante creado:', newStudent);
            this.dialogRef.close({
              updated: true
            });
          },
          error: (err) => {
            console.error('Error al crear:', err);
            this.dialogRef.close({
              updated: false,
              error: err
            });
          }
        });
    }
  }

  closeModal() {
    this.dialogRef.close({
      updated: false
    });
  }

  updateField<K extends keyof IStudent>(
    field: K,
    value: IStudent[K]
  ) {

    this.studentData.update(student => ({
      ...student,
      [field]: value
    }));

  }
}
