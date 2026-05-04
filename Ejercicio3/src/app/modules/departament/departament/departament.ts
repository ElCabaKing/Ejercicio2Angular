import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartamentService } from '../../../services/departament/departament-service';
import { IDepartment } from '../../../core/interfaces/departament';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departament',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './departament.html',
  styleUrl: './departament.scss',
})
export class Departament implements OnInit {
  public isLoading = signal(false);
  public errorMessage = signal('');
  public searchTerm = signal('');
  public listDepartaments = signal<IDepartment[]>([]);
  private readonly departamentService = inject(DepartamentService);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.departamentService.getDepartaments().subscribe({
      next: (departaments) => {
        console.log('Departamentos cargados:', departaments);
        this.listDepartaments.set(departaments);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando departamentos:', error);
        this.errorMessage.set('No se pudo cargar la lista de departamentos.');
        this.isLoading.set(false);
      }
    });
  }

 searchDepartamentById(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    if(!this.searchTerm()) {
      console.log('No hay texto de búsqueda, mostrando todos los departamentos.');
      this.departamentService.getDepartaments().subscribe({
        next: (departaments) => {
          console.log('Departamentos cargados:', departaments);
          this.listDepartaments.set(departaments);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error cargando departamentos:', error);
          this.errorMessage.set('No se pudo cargar la lista de departamentos.');
          this.isLoading.set(false);
        }
      });
      return;
    }
    this.departamentService.getDepartamentById(Number(this.searchTerm())).subscribe({
      next: (departament) => {
        console.log('Departamento encontrado:', departament);
        this.listDepartaments.set([departament]);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando departamento:', error);
        this.errorMessage.set('No se pudo cargar el departamento solicitado.');
        this.isLoading.set(false);
      }
    });
  }
}
