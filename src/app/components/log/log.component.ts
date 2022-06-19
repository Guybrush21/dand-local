import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadLogRecords } from 'src/app/state/logrecord/logrecord.actions';
import { selectLogRecords } from 'src/app/state/logrecord/logrecord.selector';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent {
  logs$ = this.store.select(selectLogRecords);
  constructor(private store: Store) {
    this.store.dispatch(loadLogRecords());
  }
}
