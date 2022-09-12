import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(loadSessions());
  }

  goToSession(id: string) {
    this.router.navigate(['/session'], { queryParams: { id } });
  }
}
