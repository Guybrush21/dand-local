import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import LogRecord from 'src/app/model/logRecord.model';
import { removeLogRecord } from 'src/app/state/logrecord/logrecord.actions';
import { selectLogRecords } from 'src/app/state/logrecord/logrecord.selector';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent {
  logs$ = this.store.select(selectLogRecords);

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  confirmDelete(event: Event, log: LogRecord) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(removeLogRecord({ logRecord: log }));
      },
      reject: () => {
        //reject action
      },
    });
  }

  edit(log: LogRecord) {
    //this.store.dispatch(({ logs }));
  }
}
