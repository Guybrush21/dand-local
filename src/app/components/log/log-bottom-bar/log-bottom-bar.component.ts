import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeLogForm } from 'src/app/state/ui/ui.action';
import { logFormSelector, uiSelector } from 'src/app/state/ui/ui.selector';

@Component({
  selector: 'app-log-bottom-bar',
  templateUrl: './log-bottom-bar.component.html',
  styleUrls: ['./log-bottom-bar.component.scss'],
})
export class LogBottomBarComponent {
  visibile$ = this.store.select(logFormSelector);

  constructor(private store: Store) {}
  close() {
    this.store.dispatch(closeLogForm());
  }
}
