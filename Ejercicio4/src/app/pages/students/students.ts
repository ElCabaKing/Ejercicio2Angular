import { Component, inject, signal } from '@angular/core';
import { IStudent } from '../../core/interfaces/IStudent';
import { StudentService } from '../../services/student/student-service';
import { StudentCard } from '../../components/student-card/student-card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spinner } from '../../components/spinner/spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentModal } from '../../components/student-modal/student-modal';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-students',
  imports: [StudentCard, FormsModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, Spinner, MatDialogModule, MatButtonModule
  ],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students {
  public listStudent = signal<IStudent[]>([]);
  public isLoading = signal(false);
  private readonly studentService = new StudentService();
  public searchTerm = signal('');

  public searchStudent(id: string): void {
    this.isLoading.set(true);
    if (!id) {
      this.loadStudents();
      return;
    }
    
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.listStudent.set([student]);
      },
      error: () => {
        this.listStudent.set([]);
      },
      complete: () => {this.isLoading.set(false); }
    });
  }

  public loadStudents(): void {
    console.log('Cargando estudiantes...');
    this.isLoading.set(true);
    this.studentService.getStudents().subscribe({
      next: (students) => this.listStudent.set(students),
      error: (err) => console.error(err),
      complete: () => {this.isLoading.set(false); }

    });
  } 

  ngOnInit(): void {
    this.loadStudents();
  }

  dialog = inject(MatDialog);

  openStudentModal() {
   const dialogRef = this.dialog.open(StudentModal, {
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado', result);
      if (result?.updated) {
        this.loadStudents(); 
      }
    });
  }
}
