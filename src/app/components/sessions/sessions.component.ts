import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SESSION_TYPE } from 'src/app/common/constant';
import { loadSessions } from 'src/app/state/session/session.actions';
import { openForm } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent {
  constructor(private store: Store, private router: Router) {
    this.store.dispatch(loadSessions());
  }

  public openNewForm() {
    this.router.navigateByUrl('/new-session');
  }
}
