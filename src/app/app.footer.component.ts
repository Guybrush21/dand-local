import { version } from 'src/app/common/constant';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppMainComponent } from './app.main.component';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
  version: string = version;
  constructor(public appMain: AppMainComponent) {}
}
