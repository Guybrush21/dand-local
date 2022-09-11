import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSessions } from 'src/app/state/session/session.actions';
import { selectSessions } from 'src/app/state/session/session.selector';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
})
export class SessionListComponent {
  sessions$ = this.store.select(selectSessions);

  constructor(private store: Store) {
    this.store.dispatch(loadSessions());
  }
}
