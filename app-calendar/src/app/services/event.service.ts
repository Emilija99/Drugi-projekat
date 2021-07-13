import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CalendarEvent } from '../models/CalendarEvent';
import { environment } from '../../environments/environment';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

  getAllEvents(): Observable<CalendarEvent[]> {
    return this.httpClient
      .get<{ id: string; name: string; date: string; isRepeating: boolean }[]>(
        environment.apiUrl + '/events'
      )
      .pipe(
        map((events) =>
          events.map((ev) => ({
            id: ev.id,
            date: new Date(ev.date),
            name: ev.name,
            isRepeating: ev.isRepeating,
          }))
        ),
        catchError(errorHandler)
      );
  }
  addNewEvent(
    name: string,
    date: Date,
    isRepeating: boolean
  ): Observable<CalendarEvent> {
    return this.httpClient
      .post<{ id: string }>(
        environment.apiUrl + '/events',
        { name, date: date.toUTCString(), isRepeating },
        httpOptions
      )
      .pipe(
        map((returnedId) => ({
          id: returnedId.id,
          name: name,
          date: date,
          isRepeating,
        })),
        catchError(errorHandler)
      );
  }

  deleteEvent(id: string): Observable<CalendarEvent> {
    return this.httpClient
      .delete<{ id: string; name: string; date: string; isRepeating: boolean }>(
        environment.apiUrl + `/events/${id}`,
        httpOptions
      )
      .pipe(
        map((ev) => ({
          id: ev.id,
          name: ev.name,
          date: new Date(ev.date),
          isRepeating: ev.isRepeating,
        })),
        catchError(errorHandler)
      );
  }

  deleteRepeatingEvent(name: string) {
    return this.httpClient
      .delete<{name:string}>(environment.apiUrl + `/events/deleteRepeatingEvent/${name}`)
      .pipe(catchError(errorHandler));
  }
}

const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage =
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code: ${error.status}`;

  return throwError(errorMessage);
};
