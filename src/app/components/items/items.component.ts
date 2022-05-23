import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeForm, openNewForm } from 'src/app/state/items/ui/item.ui.action';
import { itemUISelector } from 'src/app/state/items/ui/item.ui.selector';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  ui$ = this.store.select(itemUISelector);

  constructor(private store: Store) {}

  openNewForm() {
    this.store.dispatch(openNewForm());
  }

  closeForm() {
    this.store.dispatch(closeForm());
  }
}
