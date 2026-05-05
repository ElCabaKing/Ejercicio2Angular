import { Component, EventEmitter, Output } from '@angular/core';
import { IEmployee } from '../../../core/interfaces/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-modal.html',
  styleUrl: './employee-modal.scss',
})
export class EmployeeModal {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<IEmployee>>();
  
  closeModal(): void {
    this.close.emit();
  }

  employeeData: Partial<IEmployee> = {
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    avatar: 'https://avatars.githubusercontent.com/u/212994926?v=4',
  };

  saveEmployee(): void {
    console.log('Guardando empleado:', this.employeeData);
    this.save.emit(this.employeeData);
  }


}
