import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  select,
  selectOnlyFavorite,
} from 'src/app/state/location/location.selector';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent implements OnInit {
  @Input() onlyFavorites: boolean;
  locations$ = this.store.select(select);

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.onlyFavorites)
      this.locations$ = this.store.select(selectOnlyFavorite);
  }
}
