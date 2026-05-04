import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartamentService } from '../../../services/departament/departament-service';
import { IDepartment } from '../../../core/interfaces/departament';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-departament',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departament.html',
  styleUrl: './departament.scss',
})
export class Departament implements OnInit {
  public isLoading = signal(false);
  public listDepartaments = signal<IDepartment[]>([]);
  private readonly departamentService = inject(DepartamentService);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.departamentService.getDepartaments().subscribe({
      next: (departaments) => {
        console.log('Departamentos cargados:', departaments);
        this.listDepartaments.set(departaments);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando departamentos:', error);
        this.isLoading.set(false);
      }
    });
  }

  searchDepartamentById(id: number): void {
    this.isLoading.set(true);
    this.departamentService.getDepartamentById(id).subscribe({
      next: (departament) => {
        console.log('Departamento encontrado:', departament);
        this.listDepartaments.set([departament]);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando departamento:', error);
        this.isLoading.set(false);
      }
    });
  }
}
