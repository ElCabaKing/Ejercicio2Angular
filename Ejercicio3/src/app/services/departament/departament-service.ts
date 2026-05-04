import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartment } from '../../core/interfaces/departament';
import { environment } from '../../../env/enviroments';
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
}
