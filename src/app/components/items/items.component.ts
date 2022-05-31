import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITEM_TYPE } from 'src/app/common/constant';
import {
  generateRandomItem,
  loadItems,
} from 'src/app/state/items/item.actions';
import { openForm, selectCharachter } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  constructor(private store: Store) {
    this.store.dispatch(loadItems());
  }

  openNewForm() {
    this.store.dispatch(openForm({ newFormType: ITEM_TYPE }));
  }

  generateRandomItem() {
    this.store.dispatch(generateRandomItem());
  }
}
