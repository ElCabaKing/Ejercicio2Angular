import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Materia {
  nombre: string;
  creditos: number;
  aprobada: boolean;
}

@Component({
  selector: 'app-body-component',
  imports: [FormsModule],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  public busqueda: string = '';
  public creditos: number = 45;
  materias: Materia[] = [{ nombre: 'Cálculo', creditos: 4, aprobada: true },
  { nombre: 'Física', creditos: 4, aprobada: false },
  { nombre: 'Programación', creditos: 3, aprobada: true },
  { nombre: 'Base de Datos', creditos: 3, aprobada: false },
  { nombre: 'Inglés', creditos: 2, aprobada: true },];
}
