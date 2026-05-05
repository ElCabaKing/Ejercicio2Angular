import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartment } from '../../core/interfaces/departament';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DepartamentService {
  private readonly http = inject(HttpClient);

  getDepartaments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${environment.apiUrl}/departments`);
  }

  getDepartamentById(id: number): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${environment.apiUrl}/departments/${id}`);
  }

  createDepartment(departmentData: Partial<IDepartment>): Observable<IDepartment> {
    return this.http.post<IDepartment>(`${environment.apiUrl}/departments`, departmentData);
  }
  
  updateDepartment(id: number, departmentData: Partial<IDepartment>): Observable<IDepartment> {
    return this.http.put<IDepartment>(`${environment.apiUrl}/departments/${id}`, departmentData);
   }

   deleteDepartment(id: number): Observable<void> {
     return this.http.delete<void>(`${environment.apiUrl}/departments/${id}`);
   }
}
