import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { loadEvents } from './store/calendar.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-calendar';
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(){
    this.store.dispatch(loadEvents());
  }
}
