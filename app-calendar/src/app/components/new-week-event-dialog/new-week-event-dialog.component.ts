import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RepeatingEvent } from 'src/app/models/RepeatingEvent';
import { AppState } from 'src/app/store/app-state';
import { addEvent } from 'src/app/store/calendar.actions';

@Component({
  selector: 'app-new-week-event-dialog',
  templateUrl: './new-week-event-dialog.component.html',
  styleUrls: ['./new-week-event-dialog.component.scss'],
})
export class NewWeekEventDialogComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  weekEvent: RepeatingEvent = {
    name: '',
    time: '',
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),
    days: new Array(7),
  };
  weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  ngOnInit(): void {}

  makeRepeatingEvents(repeatingEvent: RepeatingEvent)  {
    const startDate=this.mergeDateAndTime(repeatingEvent.startDate.toString(),repeatingEvent.time);
    const endDate=this.mergeDateAndTime(repeatingEvent.endDate.toString(),repeatingEvent.time);

    repeatingEvent.days.forEach((day,index)=>{
      if(day){
       const date= this.findFirstWeekDayStartingFrom(startDate,index);
       while(date<=endDate){
           const eventDate=new Date(date.getTime());
           console.log(eventDate);
           this.store.dispatch(addEvent({name:repeatingEvent.name, date:eventDate, isRepeating:true}))
           date.setDate(date.getDate()+7);
       }


      }
    })
    
  }

  findFirstWeekDayStartingFrom(startDate:Date,day:number){
    const date=new Date(startDate);
    while(date.getDay()!==day)
        date.setDate(date.getDate()+1);
    console.log(startDate);
    console.log(date);
    return date;



  }

   mergeDateAndTime(date:string,time:string):Date{

    const newDate= new Date(
      +new Date(date)
      +this.parseDaytime(time)
    );
    console.log(newDate);
    return newDate;

   }
   parseDaytime(time:string) {
    let [hours, minutes] = time.substr(0, time.length  -2).split(":").map(Number);
    if (time.includes("PM") && hours !== 12) hours += 12;
    return 1000/*ms*/ * 60/*s*/ * (hours * 60 + minutes);
  }

}
