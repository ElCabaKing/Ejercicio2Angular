import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartamentService } from '../../../services/departament/departament-service';
import { IDepartment } from '../../../core/interfaces/departament';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartamentModal } from '../../components/departament-modal/departament-modal';

@Component({
  selector: 'app-departament',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DepartamentModal],
  templateUrl: './departament.html',
  styleUrl: './departament.scss',
})
export class Departament implements OnInit {
  public isLoading = signal(false);
  public errorMessage = signal('');
  public searchTerm = signal('');
  public showModal = signal(false);
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

  createDepartment(departmentData: Partial<IDepartment>): void {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.departamentService.createDepartment(departmentData).subscribe({
        next: (newDepartment) => {
          console.log('Departamento creado:', newDepartment);
          this.listDepartaments.update(departaments => [...departaments, newDepartment]);
          this.isLoading.set(false);
          this.showModal.set(false);
        },
        error: (error) => {
          console.error('Error creando departamento:', error);
          this.errorMessage.set('No se pudo crear el departamento.');
          this.isLoading.set(false);
        }
      });
  }

  deleteDepartment(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.departamentService.deleteDepartment(Number(id)).subscribe({
      next: () => {
        console.log('Departamento eliminado:', id);
        this.listDepartaments.update(departaments => departaments.filter(d => d.id !== id));
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error eliminando departamento:', error);
        this.errorMessage.set('No se pudo eliminar el departamento.');
        this.isLoading.set(false);
      }
    });
  }
}
