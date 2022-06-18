import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITEM_TYPE } from 'src/app/common/constant';
import ItemGenerator from 'src/app/generators/itemGenerator';
import {
  generateRandomItem,
  loadItems,
  SaveItem,
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
    const generator = new ItemGenerator();
    const item = generator.next();
    this.store.dispatch(SaveItem({ item }));
  }
}
