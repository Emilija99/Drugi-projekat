import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'src/app/models/CalendarEvent';

import { AppState } from 'src/app/store/app-state';
import { selectNextTenDays } from 'src/app/store/calendar.selectors';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  upcomingDays: Observable<{ [key: string]: CalendarEvent[] }> | null = null;
  keys: string[] = new Array(10)
    .fill(0)
    .map((el, index) =>
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + index
      ).toDateString()
    );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.upcomingDays = this.store.select(selectNextTenDays);
  }

  returnEventsForKey(upcomingDays:{[key:string]:CalendarEvent[]} | null,key:string){
    console.log(upcomingDays);
    if(upcomingDays)
    return upcomingDays[key];
    else return null;
    
  }
}
