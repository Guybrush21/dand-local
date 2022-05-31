import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ITEM_TYPE } from 'src/app/common/constant';
import Item from 'src/app/model/item.model';
import { SaveItem } from 'src/app/state/items/item.actions';
import { closeForm } from 'src/app/state/items/ui/item.ui.action';
import { itemUISelector } from 'src/app/state/items/ui/item.ui.selector';
import { v4 } from 'uuid';
@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss'],
})
export class ItemsFormComponent {
  form = new FormGroup({
    id: new FormControl(),
    _rev: new FormControl(),
    name: new FormControl(''),
    description: new FormControl(''),
    isFavorite: new FormControl(false),
  });

  ui$ = this.store
    .select(itemUISelector)
    .subscribe((x) => this.mapForm(x.selectedItem));

  constructor(private store: Store) {}

  mapForm(x: Item): void {
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
    const item: Item = {
      _id: this.form.controls['id'].value,
      _rev: this.form.controls['_rev'].value,
      name: this.form.controls['name'].value,
      isFavorite: this.form.controls['isFavorite'].value,
      type: ITEM_TYPE,
      description: this.form.controls['description'].value,
    };

    //if (item._id === null || item._id === undefined) item._id = v4();

    this.store.dispatch(SaveItem({ item: item }));
    this.closeForm();
  }

  closeForm() {
    this.store.dispatch(closeForm());
    this.form.reset();
  }
}
