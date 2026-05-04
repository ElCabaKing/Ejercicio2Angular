import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee-service';
import { IEmployee } from '../../../core/interfaces/employee';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee implements OnInit{

  public isLoading = signal(false);
  public listEmployees = signal<IEmployee[]>([]);
  private readonly employeeService = inject(EmployeeService);

  ngOnInit(): void {
     this.isLoading.set(true);
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        console.log('Empleados cargados:', employees);
        this.listEmployees.set(employees);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando empleados:', error);
        this.isLoading.set(false);
      }
    });
  }
}
