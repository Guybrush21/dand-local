import { createAction, props } from '@ngrx/store';
import Location from '../../model/location.model';

export const SaveLocation = createAction(
  '[Locations] Save location',
  props<{ location: Location }>()
);

export const SaveLocationSuccess = createAction(
  '[Locations] Save location Success',
  props<{ location: Location }>()
);

export const SaveLocationFail = createAction(
  '[Locations] Save location Fail',
  props<{ location: Location; error: string }>()
);

export const removeLocation = createAction(
  '[Locations] Remove location',
  props<{ location: Location }>()
);

export const removeLocationSuccess = createAction(
  '[Locations] Remove location Success',
  props<{ location: Location }>()
);

export const removeLocationFail = createAction(
  '[Locations] Remove location Fail',
  props<{ location: Location; error: string }>()
);

export const loadLocations = createAction('[Locations] Load all locations');

export const loadLocationsSuccess = createAction(
  '[Locations] Load all locations Success',
  props<{ locations: Location[] }>()
);

export const loadLocationsFail = createAction(
  '[Locations] Load all locations Fail'
);

export const generateRandomlocation = createAction(
  '[Locations] Generate random location'
);
