import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ICourse } from '../../core/interfaces/ICourse';
import { MatDialog } from '@angular/material/dialog';
import { CourseModal } from '../course-modal/course-modal';
import { DeleteCourseConfirmation } from '../delete-course-confirmation/delete-course-confirmation';

@Component({
  selector: 'app-course-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {

  @Input() course: ICourse | null = null;
  @Output() courseUpdated = new EventEmitter<void>();
  dialog = inject(MatDialog);

  openCourseModal() {
    const dialogRef = this.dialog.open(CourseModal, {
      data: {
        id: this.course?.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal de curso cerrado desde card:', result);
      if (result?.updated) {
        this.courseUpdated.emit();
      }
    });
  }

  deleteCourse() {
    const dialogRef = this.dialog.open(DeleteCourseConfirmation, {
      data: {
        id: this.course?.id,
        name: this.course?.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Confirmación de curso cerrada desde card:', result);
      if (result?.updated) {
        this.courseUpdated.emit();
      }
    });
  }
}
