import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { DbService } from 'src/app/db/db.service';
import Base from 'src/app/model/base.model';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss'],
})
export class AttachmentUploadComponent {
  @Input() entity: Base;

  constructor(private db: DbService) {}

  uploadFile(event: FileUpload) {
    this.db.addAttachment(this.entity, event.files[0].name, event.files[0]);
  }
}
