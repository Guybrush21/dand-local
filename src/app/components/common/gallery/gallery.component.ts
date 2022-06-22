import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { DbService } from 'src/app/db/db.service';
import Base from 'src/app/model/base.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() entity: Base;

  imgUrl: SafeUrl;
  constructor(
    private db: DbService,
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.db.getImages(this.entity).then((x) => {
      this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(x)
      );
    });
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.db.removeImages(this.entity);
      },
      reject: () => {
        //reject action
      },
    });
  }
}
