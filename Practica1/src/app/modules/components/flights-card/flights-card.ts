import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IFlight } from '../../../core/interfaces/Iflights';
import { EditFlightModal } from '../edit-flight-modal/edit-flight-modal';

@Component({
  selector: 'app-flights-card',
  imports: [EditFlightModal],
  templateUrl: './flights-card.html',
  styleUrl: './flights-card.scss',
})
export class FlightsCard {
  public showEditModal = signal(false);

  @Input() flight: IFlight | null = null;
  

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Partial<IFlight>>();

  updateFlight(flightEdit: Partial<IFlight>): void {
    this.edit.emit(flightEdit);
  }

  onDelete() {
    this.delete.emit();
  }
}
