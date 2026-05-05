import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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

  createEmployee(employee: Partial<IEmployee>): Observable<IEmployee> {
    return this.http.post<IEmployee>(`${environment.apiUrl}/employees`, employee);
  }

  updateEmployee(id: number, employee: Partial<IEmployee>): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${environment.apiUrl}/employees/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/employees/${id}`);
  }
}
