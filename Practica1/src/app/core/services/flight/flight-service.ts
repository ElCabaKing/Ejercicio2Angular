import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFlight } from '../../interfaces/Iflights';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  getFlights() : Observable<IFlight[]> {
    return this.http.get<IFlight[]>(`${environment.apiURL}/flights`);
  }

  getFlightById(id: string) : Observable<IFlight> {
    return this.http.get<IFlight>(`${environment.apiURL}/flights/${id}`);
  }

  createFlight(flight: Partial<IFlight>) : Observable<IFlight> {
    return this.http.post<IFlight>(`${environment.apiURL}/flights`, flight);
  }

  updateFlight(id: string, flight: IFlight) : Observable<IFlight> {
    return this.http.put<IFlight>(`${environment.apiURL}/flights/${id}`, flight);
  }

  deleteFlight(id: string) : Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/flights/${id}`);
  }
}
