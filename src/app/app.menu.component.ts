import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppMainComponent } from './app.main.component';
import { openLogForm } from './state/ui/ui.action';

@Component({
  selector: 'app-menu',
  template: `
    <div class="layout-menu-container">
      <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
        <li
          app-menu
          class="layout-menuitem-category"
          *ngFor="let item of model; let i = index"
          [item]="item"
          [index]="i"
          [root]="true"
          role="none"
        >
          <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">
            {{ item.label }}
          </div>
          <ul role="menu">
            <li
              app-menuitem
              *ngFor="let child of item.items"
              [item]="child"
              [index]="i"
              role="none"
            ></li>
          </ul>
        </li>
      </ul>
      <p-button (onClick)="addLogRecord()">Add Log Record</p-button>
    </div>
  `,
})
export class AppMenuComponent implements OnInit {
  model: any[];

  constructor(public appMain: AppMainComponent, private store: Store) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Campaign',
        items: [
          {
            label: 'Characters',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/characters'],
          },
          {
            label: 'Locations',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/locations'],
          },
          {
            label: 'Items',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/items'],
          },
          {
            label: 'Diary logs',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/logs'],
          },
        ],
      },
    ];
  }

  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
      event.preventDefault();
    }
  }
  addLogRecord() {
    this.store.dispatch(openLogForm());
  }
}
