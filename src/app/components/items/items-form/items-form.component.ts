import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ITEM_TYPE } from 'src/app/common/constant';
import Item from 'src/app/model/item.model';
import { addItem } from 'src/app/state/items/item.actions';
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
    name: new FormControl(''),
    description: new FormControl(''),
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
        name: x.name,
        description: x.description,
      });
  }

  onSubmit() {
    const item: Item = {
      _id: this.form.controls['id'].value,
      name: this.form.controls['name'].value,
      isFavorite: false,
      type: ITEM_TYPE,
      description: this.form.controls['description'].value,
    };

    if (item._id === null || item._id === undefined) item._id = v4();

    this.store.dispatch(addItem({ item: item }));
    this.closeForm();
  }

  closeForm() {
    this.store.dispatch(closeForm());
    this.form.reset();
  }
}
