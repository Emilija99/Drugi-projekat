import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CalendarEvent} from '../models/CalendarEvent';

import * as Actions from './calendar.actions';

export interface CalendarState extends EntityState<CalendarEvent> {
  currentMonth: number;
  currentYear: number;
}

const adapter = createEntityAdapter<CalendarEvent>({});

const initialState: CalendarState = adapter.getInitialState({
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
});

export const calendarReducer = createReducer(
  initialState,
  on(Actions.addEventSuccess, (state, { newEvent }) => 
    
     adapter.addOne(newEvent, state)
  ),
  on(Actions.changeCurrentMonth, (state, { newMonth }) => ({
    ...state,
    currentMonth: newMonth,
  })),
  on(Actions.changeCurrentYear, (state, { newYear }) => ({
    ...state,
    currentYear: newYear,
  })),
  on(Actions.loadEventsSuccess, (state, { events }) =>
    adapter.setAll(events, state)
  ),
  on(Actions.deleteEventSuccess, (state, { event }) => 
     adapter.removeOne(event.id, state)
  ),
  on(Actions.deleteRepeatingEventSuccess, (state, { name }) =>
    adapter.removeMany(
      (event) => event.name === name && event.isRepeating === true,
      state
    )
  )
);

/*export interface CalendarState {
  months: Readonly<MonthsHashtable>;
  currentMonth: number;
  currentYear: number;
}

export const initialState: CalendarState = {
  months: {},
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
};

export const calendarReducer = createReducer(
  initialState,
  on(Actions.addEventSuccess, (state, { newEvent }) => {
    const monthKey =
      newEvent.date.getFullYear().toString() +
      newEvent.date.getMonth().toString();
    const dayKey = newEvent.date.toDateString();

    return {
      ...state,
      months: {
        ...state.months,
        [monthKey]: {
          ...state.months[monthKey],
          [dayKey]: {
            events:
              state.months[monthKey] &&
              state.months[monthKey][dayKey] &&
              state.months[monthKey][dayKey].events
                ? [...state.months[monthKey][dayKey].events, newEvent]
                : [newEvent],
          },
        },
      },
    };
  }),
  on(Actions.changeCurrentMonth, (state, { newMonth }) => ({
    ...state,
    currentMonth: newMonth,
  })),
  on(Actions.changeCurrentYear, (state, { newYear }) => ({
    ...state,
    currentYear: newYear,
  })),
  on(Actions.loadEventsSuccess,(state,{events})=>{
    const hash:MonthsHashtable={};
    events.forEach(ev=>{
      const monthKey= ev.date.getFullYear().toString() +
      ev.date.getMonth().toString();
      const dayKey=ev.date.toDateString();
    
      if(!hash[monthKey])
          hash[monthKey]={};
      if(!hash[monthKey][dayKey])
         hash[monthKey][dayKey]={events:[]};
      hash[monthKey][dayKey].events.push(ev);
      
    });
    return {
      ...state,
      months:hash
    }
  }),
  on(Actions.deleteEventSuccess,(state,{event})=>{

    const monthKey= event.date.getFullYear().toString() +
      event.date.getMonth().toString();
      const dayKey=event.date.toDateString();

      return {
        ...state,
        months:{
          ...state.months,
          [monthKey]:{
            ...state.months[monthKey],
            [dayKey]:{
              events:state.months[monthKey][dayKey].events.filter(ev=>ev.id!==event.id)
            }
          }
        }
      }

  })
);*/
