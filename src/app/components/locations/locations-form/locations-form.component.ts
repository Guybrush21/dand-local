import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { uiSelector } from 'src/app/state/ui/ui.selector';
import Location from 'src/app/model/location.model';
import { LOCATION_TYPE } from 'src/app/common/constant';
import { SaveLocation } from 'src/app/state/location/location.actions';
import { closeForm } from 'src/app/state/ui/ui.action';
@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.scss'],
})
export class LocationsFormComponent {
  form = new FormGroup({
    id: new FormControl(),
    _rev: new FormControl(),
    name: new FormControl(''),
    description: new FormControl(''),
    area: new FormControl(''),
    isFavorite: new FormControl(false),
  });

  ui$ = this.store.select(uiSelector).subscribe((x) => {
    this.mapForm(x.selectedLocation);
    this.location = x.selectedLocation;
  });
  location: Location;

  constructor(private store: Store) {}

  mapForm(x: Location): void {
    if (x == null) this.form.reset();
    else
      this.form.patchValue({
        id: x._id,
        _rev: x._rev,
        name: x.name,
        description: x.description,
        isFavorite: x.isFavorite,
      });
  }

  onSubmit() {
    const tosave: Location = {
      _id: this.form.controls['id'].value,
      _rev: this.form.controls['_rev'].value,
      name: this.form.controls['name'].value,
      isFavorite: this.form.controls['isFavorite'].value,
      type: LOCATION_TYPE,
      description: this.form.controls['description'].value,
      area: null,
    };

    this.store.dispatch(SaveLocation({ location: tosave }));
    this.closeForm();
  }

  closeForm() {
    this.store.dispatch(closeForm());
    this.form.reset();
  }
}
