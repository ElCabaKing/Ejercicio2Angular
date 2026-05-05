import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-module-router';
import { Employee } from './employee/employee';
import { EmployeeModal } from '../components/employee-modal/employee-modal';

@NgModule({
  declarations: [],
  imports: [CommonModule, EmployeeRoutingModule, Employee, EmployeeModal],
})
export class EmployeeModule {}
