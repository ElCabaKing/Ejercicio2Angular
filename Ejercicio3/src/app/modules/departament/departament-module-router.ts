import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Departament } from './departament/departament';

const routes: Routes = [
  {
    path: '', component: Departament, title: 'Ejercicio 3'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentRoutingModule { }
