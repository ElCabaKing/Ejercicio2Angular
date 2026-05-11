import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IStudent } from '../../core/interfaces/IStudent';

@Component({
  selector: 'app-student-card',
  imports: [MatCardModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.scss',
})
export class StudentCard {
  @Input() student: IStudent | null = null;
  
}
