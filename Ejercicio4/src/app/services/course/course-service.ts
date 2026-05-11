import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICourse } from '../../core/interfaces/ICourse';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.apiUrl}/courses`);
  }
  getCourseById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.apiUrl}/courses/${id}`);
  }
}
