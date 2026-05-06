import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IFlight } from '../../../core/interfaces/Iflights';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toDateTimeLocalValue } from '../../../utils/dateLocal';

@Component({
  selector: 'app-edit-flight-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-flight-modal.html',
  styleUrl: './edit-flight-modal.scss',
})
export class EditFlightModal implements OnChanges {
  @Input() flight: IFlight | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Partial<IFlight>>();

  flightData = {
    flightNumber: '',
    origin: '',
    destination: '',
    departure: new Date(),
    price: '',
    id: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'] && this.flight) {
      this.flightData = {
        flightNumber: this.flight.flightNumber ?? '',
        origin: this.flight.origin ?? '',
        destination: this.flight.destination ?? '',
        departure: this.flight.departure ?? new Date(),
        price: this.flight.price?.toString() ?? '',
        id: this.flight.id ?? '',
      };
    }
  }
  public flightDepartureLocal = toDateTimeLocalValue(this.flightData.departure);

  saveFlight(): void {
    console.log('Submitting flight data:', this.flightData);
    this.submit.emit(this.flightData);
  }
  onClose() {
    this.close.emit();
  }
}

