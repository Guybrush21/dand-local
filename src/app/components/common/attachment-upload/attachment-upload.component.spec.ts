import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DbService } from 'src/app/db/db.service';

import { AttachmentUploadComponent } from './attachment-upload.component';

describe('AttachmentUploadComponent', () => {
  let component: AttachmentUploadComponent;
  let fixture: ComponentFixture<AttachmentUploadComponent>;

  beforeEach(async () => {
    var dbservice = new DbService(null);
    await TestBed.configureTestingModule({
      declarations: [AttachmentUploadComponent],
      providers: [{ provide: DbService, useValue: dbservice }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentUploadComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
