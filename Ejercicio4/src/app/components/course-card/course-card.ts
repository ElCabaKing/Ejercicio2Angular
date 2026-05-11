import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICourse } from '../../core/interfaces/ICourse';

@Component({
  selector: 'app-course-card',
  imports: [MatCardModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {

  @Input() course: ICourse | null = null;
}
