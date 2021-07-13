import { Component, Inject, OnInit,Input, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'src/app/models/CalendarEvent';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { deleteEvent, deleteRepeatingEvent } from 'src/app/store/calendar.actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {

  faTrash=faTrash;
  @Input() events:CalendarEvent[] | null=null;
  @Input() title:string='123';
  className=['repeating','one-time'];
  
  constructor(public matDialog:MatDialog,private store: Store<AppState>,@Optional() @Inject(MAT_DIALOG_DATA) data:{events:CalendarEvent[],title:string} | null) { 
    if(data){
      if(data.events)
       this.events=data.events;
      if(data.title)
        this.title=data.title;
    }
    
   
  }
  
  ngOnInit(): void {
  }

  deleteEvent(ev:CalendarEvent){
   /* console.log(id);
    if(this.events){
      this.store.dispatch(deleteEvent({id}))
    this.events=this.events.filter(ev=>ev.id!==id);
    console.log(this.events);*/

    const dialogRef=this.matDialog.open(DeleteDialogComponent,{
      width:'350px',
      data:ev,
    });
    dialogRef.afterClosed().subscribe((result:{deleteRepeating:boolean})=>{
      if(result){
        if(result.deleteRepeating && ev.isRepeating===true)
            this.store.dispatch(deleteRepeatingEvent({name:ev.name}))
        else this.store.dispatch(deleteEvent({id:ev.id}))
        if(this.events)
        this.events=this.events.filter(event=>event.id!==ev.id)
      }
    })
   
    
    

  }

}
