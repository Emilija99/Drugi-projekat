import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { EventService } from "../services/event.service";
import * as CalendarActions from './calendar.actions'

@Injectable()
export class CalendarEffects{
    constructor(private eventsService:EventService, private actions$:Actions){}

    loadEventsEffect$=createEffect(()=>
    this.actions$.pipe(
        ofType(CalendarActions.loadEvents),
        mergeMap(()=>this.eventsService.getAllEvents().pipe(
            map((events)=>(CalendarActions.loadEventsSuccess({events}))),
            catchError(()=>of({type:'load error'}))
        ))
    ));

    addEventEffect$=createEffect(()=>
    this.actions$.pipe(
        ofType(CalendarActions.addEvent),
        mergeMap(ev=>this.eventsService.addNewEvent(ev.name,ev.date,ev.isRepeating).pipe(
            map((event)=>(CalendarActions.addEventSuccess({newEvent:event}))),
            catchError(()=>of({type:'load error'}))

        ))
    )
    );

    deleteEventEffect$=createEffect(()=>
       this.actions$.pipe(
           ofType(CalendarActions.deleteEvent),
           mergeMap(p=>this.eventsService.deleteEvent(p.id).pipe(
               map((event)=>(CalendarActions.deleteEventSuccess({event}))),
               catchError(()=>of({type:'load error'}))
           ))
       )
    )

    deleteRepeatingEventEffect=createEffect(()=>
        this.actions$.pipe(
            ofType(CalendarActions.deleteRepeatingEvent),
            mergeMap(par=>this.eventsService.deleteRepeatingEvent(par.name).pipe(
                map((eventName)=>(CalendarActions.deleteRepeatingEventSuccess({name:eventName.name})))
            ))
        ));
}