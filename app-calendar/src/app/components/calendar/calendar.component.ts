import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faAngleLeft, faAngleRight,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { CalendarEvent } from 'src/app/models/CalendarEvent';
import {  changeCurrentMonth, changeCurrentYear } from 'src/app/store/calendar.actions';
import { selectCurrentMonth, selectCurrentYear, selectEventsForCurrentMonth } from 'src/app/store/calendar.selectors';
import { AppState } from '../../store/app-state';
import { NewEventDialogComponent } from '../new-event-dialog/new-event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPlus=faPlus;

  currentMonth:number=0;
  currentYear = new Date().getFullYear();
  days: number[] = [];
  prevDays: number[] = [];
  nextDays: number[] = [];
 
  monthEvents:Observable<{[key:string]:CalendarEvent[]}> | null=null;
  
  currentMonthSubscription:Subscription=new Subscription();
  currentYearSubscription:Subscription=new Subscription();
  constructor(  private store: Store<AppState>,public matDialog:MatDialog) {}

  ngOnInit(): void {
    this.monthEvents=this.store.select(selectEventsForCurrentMonth);
    this.currentMonthSubscription= this.store.select(selectCurrentMonth).subscribe(month=>{this.currentMonth=month;this.makeAllDays()});
   this.currentYearSubscription=this.store.select(selectCurrentYear).subscribe(year=>{this.currentYear=year;this.makeAllDays()});
  }

  ngOnDestroy():void{
    this.currentMonthSubscription.unsubscribe();
    this.currentYearSubscription.unsubscribe();
  }



  makeAllDays(){
    this.days=this.makeDaysArray();
    this.prevDays=this.makePrevDaysArray();
    this.nextDays=this.makeNextDaysArray();
  }

  makeDaysArray(): number[] {
    return new Array(
      this.getNumberOfDaysInMonth(this.currentYear, this.currentMonth)
    )
      .fill(null)
      .map((x, i) => i + 1);
  }

  

  makePrevDaysArray(): number[] {
    const firstDayIndex = new Date(
      this.currentYear,
      this.currentMonth
    ).getDay();
    const daysInPreviousMonth = this.getNumberOfDaysInMonth(
      this.currentYear,
      this.currentMonth - 1
    );
    
    return new Array(firstDayIndex)
      .fill(null)
      .map((x, i) => daysInPreviousMonth - firstDayIndex + i + 1);
  }

  makeNextDaysArray(): number[] {
    const lastDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      this.getNumberOfDaysInMonth(this.currentYear, this.currentMonth)
    ).getDay();
    
  
    return new Array(6 - lastDayOfMonth).fill(null).map((x, i) => i + 1);
  }

  getNumberOfDaysInMonth(year: number, month: number): number {
   
    return new Date(year, month+1, 0).getDate();
  }

   changeCurrentDate(direction:number){
    let newYear:number=this.currentYear;;
    let newMonth:number;
    newMonth=this.currentMonth+direction;
    if(newMonth===12)
    {
      newMonth=0;
      newYear++;
    }
    if(newMonth===-1){
      newMonth=11;
      newYear--;
    }
    this.store.dispatch(changeCurrentMonth({newMonth}));
    this.store.dispatch(changeCurrentYear({newYear}));
    this.makeAllDays();
  
   

  }

 
  getEventsForDate(hashEvents:{[key:string]:CalendarEvent[]} | null,day:number){
    return hashEvents?hashEvents[new Date(this.currentYear,this.currentMonth,day).toDateString()]:null;
  }

  openCreateEventDialog(year:number,month:number,day:number){
    const dialogRef=this.matDialog.open(NewEventDialogComponent,{
      width:'350px',
      data:{name:'',date:new Date(year,month,day),time:''},
    });

  }

  returnDayClassName(day:number):string{

   const className=new Date().toDateString()===new Date(this.currentYear,this.currentMonth,day).toDateString()?'today':'otherDay'
   console.log(className);
   console.log(new Date().toDateString())
   console.log(new Date(this.currentYear,this.currentMonth,day).toDateString())
   return className;
  }
 
}
