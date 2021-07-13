import { createSelector, select } from '@ngrx/store';
import { CalendarEvent } from '../models/CalendarEvent';
import { AppState } from './app-state';

export const selectCalendarFeature = (state: AppState) => state.calendar;

export const selectCurrentMonth = createSelector(
  selectCalendarFeature,
  (state) => state.currentMonth
);

export const selectCurrentYear = createSelector(
  selectCalendarFeature,
  (state) => state.currentYear
);

export const selectAllEvents = createSelector(selectCalendarFeature, (state) =>
  Object.values(state.entities)
    .filter((event) => event != null)
    .map((event) => <CalendarEvent>event)
);

export const selectEventsForCurrentMonth = createSelector(
  selectAllEvents,
  selectCurrentYear,
  selectCurrentMonth,
  (events, selectedYear, selectedMonth) =>{
  
    return hashEventsByDays(events.filter(
      (ev) =>
        ev.date.getFullYear() === selectedYear &&
        ev.date.getMonth() === selectedMonth
    ) )
  }
);

export const selectNextTenDays =
  createSelector(
    selectAllEvents,

    (events) => {
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 10);
    return hashEventsByDays(events.filter((ev) => ev.date >= startDate && ev.date <= endDate))
  }
  );



 function hashEventsByDays(events:CalendarEvent[]):{ [key: string]: CalendarEvent[] }{

  const hash: { [key: string]: CalendarEvent[] } = {};
 
  events
   
    .sort((ev1,ev2)=>ev1.date.getTime()-ev2.date.getTime())
    .forEach((ev) =>
      hash[ev.date.toDateString()]
        ? hash[ev.date.toDateString()].push(ev)
        : (hash[ev.date.toDateString()] = [ev])
    );
    
    return hash;

 }

  
