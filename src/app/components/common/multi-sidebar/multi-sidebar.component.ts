import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CHARACTER_TYPE, ITEM_TYPE } from 'src/app/common/constant';
import { closeForm, openForm } from 'src/app/state/ui/ui.action';
import { uiSelector } from 'src/app/state/ui/ui.selector';

@Component({
  selector: 'app-multi-sidebar',
  templateUrl: './multi-sidebar.component.html',
  styleUrls: ['./multi-sidebar.component.scss'],
})
export class MultiSidebarComponent {
  constructor(private store: Store) {}
  visibile = false;
  typeSelected?: string;
  itemType = ITEM_TYPE;
  characterType = CHARACTER_TYPE;

  ui$ = this.store.select(uiSelector).subscribe((s) => {
    this.visibile =
      s.selectedItem != null || s.selectedCharacter != null || s.isFormOpen;
    this.typeSelected = s.selectedType;
  });

  closeForm() {
    this.store.dispatch(closeForm());
  }
}
