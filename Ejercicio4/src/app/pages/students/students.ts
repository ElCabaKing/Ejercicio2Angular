import { Component, signal } from '@angular/core';
import { IStudent } from '../../core/interfaces/IStudent';
import { StudentService } from '../../services/student/student-service';
import { StudentCard } from '../../components/student-card/student-card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-students',
  imports: [StudentCard, FormsModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, Spinner
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
}
