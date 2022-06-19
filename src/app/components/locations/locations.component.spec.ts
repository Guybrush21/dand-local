import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { LocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationsComponent],
      providers: [provideMockStore({})],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
