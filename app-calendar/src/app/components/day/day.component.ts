import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'src/app/models/CalendarEvent';

import { DayDetailsComponent } from '../day-details/day-details.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  className=['repeating','one-time'];

  @Input() events:CalendarEvent[] | null=null;

  constructor(public matDialog:MatDialog) { }

  ngOnInit(): void {
   
    
  }
openDialog(){
 
  const dialogRef=this.matDialog.open(DayDetailsComponent,{
    width:'600px',
    data:{events:this.events,
      title:this.events && this.events[0]?this.events[0].date.toDateString():''}
   
  
})
}
}
