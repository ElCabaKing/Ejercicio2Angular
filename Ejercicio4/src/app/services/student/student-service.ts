import { Injectable , inject} from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../../core/interfaces/IStudent';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private http = inject(HttpClient);


  getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${environment.apiUrl}/students`);
  }

  getStudentById(id: string): Observable<IStudent> {
    return this.http.get<IStudent>(`${environment.apiUrl}/students/${id}`);
  }
}
