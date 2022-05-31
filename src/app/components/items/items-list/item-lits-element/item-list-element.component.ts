import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import Item from 'src/app/model/item.model';
import { removeItem } from 'src/app/state/items/item.actions';
import { AppState } from 'src/app/state/state';
import { selectItem } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-item-list-element',
  templateUrl: './item-list-element.component.html',
  styleUrls: ['./item-list-element.component.scss'],
})
export class ItemListElementComponent {
  @Input() item: Item;

  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService
  ) {}

  confirmDelete(event: Event, item: Item) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(removeItem({ item }));
      },
      reject: () => {
        //reject action
      },
    });
  }

  edit(item: Item) {
    this.store.dispatch(selectItem({ item }));
  }
}
