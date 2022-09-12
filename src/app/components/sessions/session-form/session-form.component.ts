import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { SESSION_TYPE } from 'src/app/common/constant';
import Session from 'src/app/model/session.model';
import { SaveSession } from 'src/app/state/session/session.actions';
import {
  selectSessionById,
  selectSessions,
} from 'src/app/state/session/session.selector';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss'],
})
export class SessionFormComponent implements OnInit {
  id?: string;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = decodeURIComponent(params['id']);
      if (this.id) {
        this.patchForm();
      }
    });
  }

  patchForm() {
    this.store.select(selectSessionById(this.id)).subscribe((x) =>
      this.form.patchValue({
        _id: x._id,
        _rev: x._rev,
        start: x.start,
        title: x.title,
      })
    );
  }

  onSubmit() {
    this.store.dispatch(SaveSession({ session: this.mapForm() }));
    this.router.navigate(['/sessions']);
  }

  mapForm(): Session {
    return {
      start: this.form.controls.start.value,
      title: this.form.controls.title.value,
      _id: this.form.controls._id.value,
      _rev: this.form.controls._rev.value,
      npc: [],
      scenes: [],
      secrets: [],
      treasures: [],
      locations: [],
      isFavorite: false,
      type: SESSION_TYPE,
    };
  }

  form = new FormGroup({
    _id: new FormControl(),
    _rev: new FormControl(),
    start: new FormControl(),
    title: new FormControl(),
  });
}
