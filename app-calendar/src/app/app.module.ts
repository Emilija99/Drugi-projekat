import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { calendarReducer } from './store/calendar.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NewEventComponent } from './components/new-event/new-event.component';
import { DayComponent } from './components/day/day.component';
import {HttpClientModule} from '@angular/common/http'
import {EventService} from './services/event.service'
import { EffectsModule } from '@ngrx/effects';
import { CalendarEffects } from './store/calendar.effects';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import { NewEventDialogComponent } from './components/new-event-dialog/new-event-dialog.component'
import { FormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider'

import { NewWeekEventDialogComponent } from './components/new-week-event-dialog/new-week-event-dialog.component';
import { DayDetailsComponent } from './components/day-details/day-details.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NewEventComponent,
    DayComponent,
    NewEventDialogComponent,
   
    NewWeekEventDialogComponent,
    DayDetailsComponent,
    UpcomingEventsComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot({calendar:calendarReducer}),
    StoreDevtoolsModule.instrument({
      maxAge:25
    }

    ),
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([CalendarEffects]),
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule

    
  
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
