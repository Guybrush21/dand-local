import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { SESSION_TYPE } from 'src/app/common/constant';
import Session from 'src/app/model/session.model';
import { SaveSession } from 'src/app/state/session/session.actions';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss'],
})
export class SessionFormComponent {
  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(SaveSession({ session: this.mapForm() }));
  }

  mapForm(): Session {
    return {
      start: this.form.controls.start.value,
      title: this.form.controls.title.value,
      _id: this.form.controls._id.value,
      _rev: this.form.controls._rev.value,
      isFavorite: false,
      type: SESSION_TYPE,
    };
  }

  form = new UntypedFormGroup({
    _id: new FormControl(),
    _rev: new FormControl(),
    start: new FormControl(),
    title: new FormControl(),
  });
}
