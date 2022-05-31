import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  allItems,
  selectItems,
  selectOnlyFavoriteItems,
} from 'src/app/state/items/item.selector';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  @Input() onlyFavorites: boolean;
  items$ = this.store.select(selectItems);

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.onlyFavorites)
      this.items$ = this.store.select(selectOnlyFavoriteItems);
  }
}
