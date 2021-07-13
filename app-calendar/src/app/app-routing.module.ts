import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';

const routes: Routes = [
  {
  path:'calendar',
  component:CalendarComponent
  },
  {
    path:'upcomingEvents',
    component:UpcomingEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
