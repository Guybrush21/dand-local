import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfirmationService } from 'primeng/api';
import { LOCATION_TYPE } from 'src/app/common/constant';

import { LocationListItemComponent } from './location-list-item.component';

describe('LocationListItemComponent', () => {
  let component: LocationListItemComponent;
  let fixture: ComponentFixture<LocationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationListItemComponent],
      providers: [provideMockStore({ initialState: {} }), ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListItemComponent);
    component = fixture.componentInstance;
    component.location = {
      name: 'Moria',
      _id: null,
      _rev: null,
      area: null,
      description: null,
      isFavorite: false,
      type: LOCATION_TYPE,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
