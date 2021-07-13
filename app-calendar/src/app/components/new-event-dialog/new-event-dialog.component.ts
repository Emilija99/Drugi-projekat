import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { addEvent } from 'src/app/store/calendar.actions';
@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.scss']
})
export class NewEventDialogComponent implements OnInit {

  
  constructor(@Inject(MAT_DIALOG_DATA) public data:{name:string,date:Date,time:string},private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  makeOneTimeEvent(){

    this.store.dispatch(addEvent({name:this.data.name,date:this.mergeDateAndTime(this.data.date.toString(),this.data.time), isRepeating:false}))

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
