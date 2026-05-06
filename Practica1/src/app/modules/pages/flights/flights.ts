import { Component, inject, OnInit, signal } from '@angular/core';
import { IFlight } from '../../../core/interfaces/Iflights';
import { FlightService } from '../../../core/services/flight/flight-service';
import { finalize } from 'rxjs';
import { FlightsCard } from '../../components/flights-card/flights-card';
import { NewFlightModal } from '../../components/new-flight-modal/new-flight-modal';
@Component({
  selector: 'app-flights',
  imports: [FlightsCard, NewFlightModal],
  templateUrl: './flights.html',
  styleUrl: './flights.scss',
})
export class Flights implements OnInit {
  public listFlights = signal<IFlight[]>([]);
  private readonly flightsService = inject(FlightService);
  public isLoading = signal(false);
  public errorMessage = signal('');
  public showNewFlightModal = signal(false);

  openNewFlightModal(): void {
    this.showNewFlightModal.set(true);
  }

  closeNewFlightModal(): void {
    this.showNewFlightModal.set(false);
  }

  ngOnInit(): void {
    this.flightsService.getFlights().pipe(finalize (() => 
      this.isLoading.set(false))).subscribe({
      next: (flights) => {
        this.listFlights.set(flights);
      },
      error: (error) => {
        console.error('Error cargando vuelos:', error);
        this.errorMessage.set('No se pudo cargar la lista de vuelos.');
      }
    });
  }

  createFlight(flight: Partial<IFlight>): void {
    this.flightsService.createFlight(flight).subscribe({
      next: (newFlight) => {
        this.listFlights.update((flights) => [...flights, newFlight]);
        this.closeNewFlightModal();
      },
      error: (error) => {
        console.error('Error creando vuelo:', error);
        this.errorMessage.set('No se pudo crear el vuelo.');
      }
    });
  }

  deleteFlight(id: string): void {
    this.flightsService.deleteFlight(id).subscribe({
      next: () => {
        this.listFlights.update((flights) => flights.filter(flight => flight.id !== id));
      },
      error: (error) => {
        console.error('Error eliminando vuelo:', error);
        this.errorMessage.set('No se pudo eliminar el vuelo.');
      }
    });
  }

  editFlight(flightEdit: Partial<IFlight>): void {
    console.log('Editing flight:', flightEdit);
    this.flightsService.updateFlight(flightEdit.id!, flightEdit as IFlight).subscribe({
      next: (updatedFlight) => {
        this.listFlights.update((flights) => flights.map(flight => flight.id === updatedFlight.id ? updatedFlight : flight));
      },
      error: (error) => {
        console.error('Error actualizando vuelo:', error);
        this.errorMessage.set('No se pudo actualizar el vuelo.');
      }
    });
  }
}
