import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { NewEventDialogComponent } from '../new-event-dialog/new-event-dialog.component';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { NewWeekEventDialogComponent } from '../new-week-event-dialog/new-week-event-dialog.component';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  faPlus=faPlus;

  constructor(public matDialog:MatDialog) { }
  mainButtonVisibility=true;
  createButtonsVisibility=false

  ngOnInit(): void {
  }

  openDialog1(){
    console.log('cao');
    const dialogRef=this.matDialog.open(NewEventDialogComponent,{
      width:'350px',
      data:{name:'',date:'',time:''},
    });
    dialogRef.afterOpened().subscribe(()=>this.changeButtonsVisibility(true,false))
    
      
    
  }

  openDialog2(){
    const dialogRef=this.matDialog.open(NewWeekEventDialogComponent,{
      width:'350px',
    });
    dialogRef.afterOpened().subscribe(()=>this.changeButtonsVisibility(true,false))
      
  }

  changeButtonsVisibility(mainButton:boolean,createButtons:boolean){
    this.mainButtonVisibility=mainButton;
    this.createButtonsVisibility=createButtons;

  }
 
}
