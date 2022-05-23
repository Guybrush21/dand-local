import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectItems } from 'src/app/state/items/item.selector';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  items$ = this.store.select(selectItems);

  constructor(private store: Store) {}
}
