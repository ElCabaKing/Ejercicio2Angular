import { Component, EventEmitter, Output } from '@angular/core';
import { IFlight } from '../../../core/interfaces/Iflights';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-flight-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-flight-modal.html',
  styleUrl: './new-flight-modal.scss',
})
export class NewFlightModal {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Partial<IFlight>>();

  flightData: Partial<IFlight> = {
    flightNumber: '',
    origin: '',
    destination: '',
    departure: new Date(),
    price: '',
  };

  onClose() {
    this.close.emit();
  }

  saveFlight() : void {
    console.log('Submitting flight data:', this.flightData);
    this.submit.emit(this.flightData);
  }

}
