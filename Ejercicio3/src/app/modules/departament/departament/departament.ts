import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartamentService } from '../../../services/departament/departament-service';
import { IDepartment } from '../../../core/interfaces/departament';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartamentModal } from '../../components/departament-modal/departament-modal';
import { finalize } from 'rxjs';

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
    this.departamentService.getDepartaments().
    pipe(finalize(() => this.isLoading.set(false))).
    subscribe({
      next: (departaments) => {
          this.listDepartaments.set(departaments);
      },
      error: (error) => {
        console.error('Error cargando departamentos:', error);
        this.errorMessage.set('No se pudo cargar la lista de departamentos.');
      }
    });
  }

 searchDepartamentById(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    if(!this.searchTerm()) {
      this.departamentService.getDepartaments().
      pipe(finalize(() => this.isLoading.set(false))).
      subscribe({
        next: (departaments) => {
          this.listDepartaments.set(departaments);
        },
        error: (error) => {
          console.error('Error cargando departamentos:', error);
          this.errorMessage.set('No se pudo cargar la lista de departamentos.');
        }
      });
      return;
    }
    this.departamentService.getDepartamentById(Number(this.searchTerm())).
    pipe(finalize(() => this.isLoading.set(false))).
    subscribe({
      next: (departament) => {
        console.log('Departamento encontrado:', departament);
        this.listDepartaments.set([departament]);
      },
      error: (error) => {
        console.error('Error cargando departamento:', error);
        this.errorMessage.set('No se pudo cargar el departamento solicitado.');
      }
    });
  }

  createDepartment(departmentData: Partial<IDepartment>): void {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.departamentService.createDepartment(departmentData).
      pipe(finalize(() => {this.isLoading.set(false);
      this.showModal.set(false);
      })).
      subscribe({
        next: (newDepartment) => {
          console.log('Departamento creado:', newDepartment);
          this.listDepartaments.update(departaments => [...departaments, newDepartment]);
        },
        error: (error) => {
          console.error('Error creando departamento:', error);
          this.errorMessage.set('No se pudo crear el departamento.');
        }
      });
  }

  deleteDepartment(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.departamentService.deleteDepartment(Number(id)).
    pipe(finalize(() => this.isLoading.set(false))).
    subscribe({
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
