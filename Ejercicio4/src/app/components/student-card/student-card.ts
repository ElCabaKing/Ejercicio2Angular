import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IStudent } from '../../core/interfaces/IStudent';
import { MatDialog } from '@angular/material/dialog';
import { StudentModal } from '../student-modal/student-modal';
import { DeleteStudentConfirmation } from '../delete-student-confirmation/delete-student-confirmation';

@Component({
  selector: 'app-student-card',
  imports: [MatCardModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.scss',
})
export class StudentCard {
  @Input() student: IStudent | null = null;
  @Output() studentUpdated = new EventEmitter<void>();
  dialog = inject(MatDialog);


  openStudentModal() {
    const dialogRef = this.dialog.open(StudentModal, {
      data: {
        id: this.student?.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado desde card:', result);
      if (result?.updated) {
        this.studentUpdated.emit();
      }
    });
  }

  deleteStudent() {
    const dialogRef = this.dialog.open(DeleteStudentConfirmation, {
      data: {
        id: this.student?.id,
        name: this.student?.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado desde card:', result);
      if (result?.updated) {
        this.studentUpdated.emit();
      }
    });
  }
}
