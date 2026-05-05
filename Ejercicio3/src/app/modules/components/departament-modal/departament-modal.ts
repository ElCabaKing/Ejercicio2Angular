import { Component, EventEmitter, Output } from '@angular/core';
import { IDepartment } from '../../../core/interfaces/departament';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departament-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './departament-modal.html',
  styleUrl: './departament-modal.scss',
})
export class DepartamentModal {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<IDepartment>>();
  
  closeModal(): void {
    this.close.emit();
  }

  departmentData: Partial<IDepartment> = {
    name: '',
    description: '',
    managerName: '',
  };

  saveDepartment(): void {
    console.log('Guardando departamento:', this.departmentData);
    this.save.emit(this.departmentData);
  }

}
