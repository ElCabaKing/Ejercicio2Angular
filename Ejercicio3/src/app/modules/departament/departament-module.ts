import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentRoutingModule } from './departament-module-router';
import { Departament } from './departament/departament';

@NgModule({
  declarations: [],
  imports: [CommonModule, DepartamentRoutingModule,Departament],
})
export class DepartamentModule {}
