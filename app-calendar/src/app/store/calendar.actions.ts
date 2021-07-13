import { createAction, props } from '@ngrx/store';
import { CalendarEvent } from '../models/CalendarEvent';


export const addEvent=createAction(
  'add event',
  props<{name:string,date:Date, isRepeating:boolean}>()
);
export const addEventSuccess = createAction(
  'add event success',
  props<{ newEvent: CalendarEvent }>()
);
export const changeCurrentMonth = createAction(
  'change current month',
  props<{ newMonth: number }>()
);
export const changeCurrentYear = createAction(
  'change current year',
  props<{ newYear: number }>()
);

export const loadEvents=createAction(
  'load events',
 );

export const loadEventsSuccess=createAction(
  'load events success',
  props<{events:CalendarEvent[]}>()
);

export const deleteEvent=createAction(
  'delete event',
  props<{id:string}>()
)

export const deleteEventSuccess=createAction(
  'delete event success',
  props<{event:CalendarEvent}>()
)

export const deleteRepeatingEvent=createAction(
  'delete repeating event',
  props<{name:string}>()
)

export const deleteRepeatingEventSuccess=createAction(

  'delete repeating event success',
  props<{name:string}>()

)
