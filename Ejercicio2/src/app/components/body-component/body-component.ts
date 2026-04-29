import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Materia {
  nombre: string;
  creditos: number;
  aprobada: boolean;
}

@Component({
  selector: 'app-body-component',
  imports: [FormsModule,
    CommonModule
  ],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  public busqueda: string = '';
  public creditos: number = 45;
  public maxCreditos: number = 120;
  materias: Materia[] = [{ nombre: 'Cálculo', creditos: 4, aprobada: true },
  { nombre: 'Física', creditos: 4, aprobada: false },
  { nombre: 'Programación', creditos: 3, aprobada: true },
  { nombre: 'Base de Datos', creditos: 3, aprobada: false },
  { nombre: 'Inglés', creditos: 2, aprobada: true },];


  sumarCreditos(): void {
    if (this.creditos >= this.maxCreditos) {
      alert('¡Has alcanzado el máximo de créditos permitidos!');
      return;
    }
    this.creditos += 10;
    if (this.creditos > this.maxCreditos) {
      this.creditos = this.maxCreditos;
    }
  }
  restarCreditos(): void {
    if (this.creditos > 0) {
      this.creditos -= 10;
    }
    if (this.creditos < 0) {
      this.creditos = 0;
    }
  }
}
