import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LOG_RECORD_TYPE } from 'src/app/common/constant';
import LogRecord from 'src/app/model/logRecord.model';
import { SaveLogRecord } from 'src/app/state/logrecord/logrecord.actions';
import { closeLogForm } from 'src/app/state/ui/ui.action';
import { uiSelector } from 'src/app/state/ui/ui.selector';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss'],
})
export class LogFormComponent {
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    _rev: new UntypedFormControl(),
    message: new UntypedFormControl(''),
    number: new UntypedFormControl(),
    timestamp: new UntypedFormControl(),
    isFavorite: new UntypedFormControl(false),
  });

  ui$ = this.store
    .select(uiSelector)
    .subscribe((x) => this.mapForm(x.selectedLogRecord));

  constructor(private store: Store) {}

  mapForm(x: LogRecord): void {
    if (x == null) this.form.reset();
    else
      this.form.patchValue({
        id: x._id,
        _rev: x._rev,
        message: x.message,
        number: x.number,
        timestamp: x.timestamp,
        isFavorite: x.isFavorite,
      });
  }

  onSubmit() {
    const tosave: LogRecord = {
      _id: this.form.controls['id'].value,
      _rev: this.form.controls['_rev'].value,
      number: this.form.controls['number'].value,
      timestamp: this.form.controls['timestamp'].value,
      message: this.form.controls['message'].value,
      isFavorite: this.form.controls['isFavorite'].value,
      type: LOG_RECORD_TYPE,
    };

    this.store.dispatch(SaveLogRecord({ logRecord: tosave }));
    this.closeForm();
  }

  closeForm() {
    this.store.dispatch(closeLogForm());
    this.form.reset();
  }
}
