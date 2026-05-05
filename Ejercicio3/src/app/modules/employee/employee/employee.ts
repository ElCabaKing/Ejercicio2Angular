import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee-service';
import { IEmployee } from '../../../core/interfaces/employee';
import { FormsModule } from '@angular/forms';
import { EmployeeModal } from '../../components/employee-modal/employee-modal';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, EmployeeModal],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee implements OnInit {

  public isLoading = signal(false);
  public errorMessage = signal('');
  public listEmployees = signal<IEmployee[]>([]);
  public searchTerm = signal('');
  public showEmployeeModal = signal(false);
  private readonly employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        console.log('Empleados cargados:', employees);
        this.listEmployees.set(employees);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando empleados:', error);
        this.errorMessage.set('No se pudo cargar la lista de empleados.');
        this.isLoading.set(false);
      }
    });
  }

  searchEmployeeById(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    if (!this.searchTerm()) {
      console.log('No hay texto de búsqueda, mostrando todos los empleados.');
      this.employeeService.getEmployees().subscribe({
        next: (employees) => {
          console.log('Empleados cargados:', employees);
          this.listEmployees.set(employees);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error cargando empleados:', error);
          this.errorMessage.set('No se pudo cargar la lista de empleados.');
          this.isLoading.set(false);
        }
      });
      return;
    }
    this.employeeService.getEmployeeById(Number(this.searchTerm())).subscribe({
      next: (employee) => {
        console.log('Empleado encontrado:', employee);
        this.listEmployees.set([employee]);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando empleado:', error);
        this.errorMessage.set('No se pudo cargar el empleado solicitado.');
        this.isLoading.set(false);
      }
    });
  }

  createEmployee(employeeData: Partial<IEmployee>): void {
    console.log('Creando empleado con datos:', employeeData);
    this.isLoading.set(true);
    this.employeeService.createEmployee(employeeData).subscribe({
      next: (newEmployee) => {
        console.log('Empleado creado:', newEmployee);
        this.listEmployees.update(employees => [...employees, newEmployee]);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error creando empleado:', error);
        this.errorMessage.set('No se pudo crear el empleado.');
        this.isLoading.set(false);
      }
    });
  }

  editEmployee(employee: IEmployee): void {
    console.log('Editando empleado:', employee);
    // Aquí podrías abrir un modal con los datos del empleado para editar
  }
  
  deleteEmployee(id: string): void {
    console.log('Eliminando empleado con ID:', id);
    this.isLoading.set(true);
    this.employeeService.deleteEmployee(Number(id)).subscribe({
      next: () => {
        console.log('Empleado eliminado con ID:', id);
        this.listEmployees.update(employees => employees.filter(emp => emp.id !== id));
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error eliminando empleado:', error);
        this.errorMessage.set('No se pudo eliminar el empleado.');
        this.isLoading.set(false);
      }
    });
  }

}
