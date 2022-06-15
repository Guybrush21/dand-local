import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListItemComponent } from './location-list-item.component';

describe('LocationListItemComponent', () => {
  let component: LocationListItemComponent;
  let fixture: ComponentFixture<LocationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
