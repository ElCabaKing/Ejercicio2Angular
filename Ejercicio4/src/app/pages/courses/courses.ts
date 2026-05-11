import { Component, inject, Signal, signal } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { ICourse } from '../../core/interfaces/ICourse';
import { CourseService } from '../../services/course/course-service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-courses',
  imports: [CourseCard, FormsModule, MatFormFieldModule, MatInputModule,
    Spinner
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  public isLoading = signal(false);
  public listCourses = signal<ICourse[]>([]);
  private readonly courseService = inject(CourseService);
  public searchTerm = signal('');

  ngOnInit(): void {
    this.loadCourses();
  }

  public searchCourse(id: string): void {
    this.isLoading.set(true);
    if (!id) {
      this.loadCourses();
      return;
    }

    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.listCourses.set([course]);
      },
      error: () => {
        this.listCourses.set([]);
      },
      complete: () => {this.isLoading.set(false); }
    });
  }

  public loadCourses(): void {
    this.isLoading.set(true);
    this.courseService.getCourses().subscribe({
      next: (courses) => this.listCourses.set(courses),
      error: (err) => console.error(err),
      complete: () => {this.isLoading.set(false); }
    });
  }
}


