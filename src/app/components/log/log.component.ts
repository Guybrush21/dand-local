import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadLogRecords } from 'src/app/state/logrecord/logrecord.actions';
import { selectLogRecords } from 'src/app/state/logrecord/logrecord.selector';
import { openLogForm } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent {
  constructor(private store: Store) {
    this.store.dispatch(loadLogRecords());
  }

  newLogRecord() {
    this.store.dispatch(openLogForm());
  }
}
