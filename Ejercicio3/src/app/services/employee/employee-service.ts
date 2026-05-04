import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/enviroments';
import { Observable } from 'rxjs';
import { IEmployee } from '../../core/interfaces/employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${environment.apiUrl}/employees`);
  }

  getEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${environment.apiUrl}/employees/${id}`);
  }
}
