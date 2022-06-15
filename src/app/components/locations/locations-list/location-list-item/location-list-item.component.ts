import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import Location from 'src/app/model/location.model';
import { removeLocation } from 'src/app/state/location/location.actions';
import { AppState } from 'src/app/state/state';
import { selectItem, selectLocation } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-location-list-item',
  templateUrl: './location-list-item.component.html',
  styleUrls: ['./location-list-item.component.scss'],
})
export class LocationListItemComponent {
  @Input() location: Location;

  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService
  ) {}

  confirmDelete(event: Event, location: Location) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(removeLocation({ location }));
      },
      reject: () => {
        //reject action
      },
    });
  }

  edit(location: Location) {
    this.store.dispatch(selectLocation({ location }));
  }
}
