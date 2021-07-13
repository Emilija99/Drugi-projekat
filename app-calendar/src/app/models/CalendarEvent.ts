export interface CalendarEvent{
    id:string;
    name:string;
    date:Date;
    isRepeating:boolean
}

export function sortEventsByDate(ev1:CalendarEvent,ev2:CalendarEvent):number{
    return ev1.date.toString().localeCompare(ev2.date.toString());
}