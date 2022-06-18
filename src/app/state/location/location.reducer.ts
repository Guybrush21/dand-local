import { createFeature, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import LocationGenerator from 'src/app/generators/locationGenerator';
import Location from 'src/app/model/location.model';
import { LocationState } from '../state';
import {
  generateRandomlocation as generateRandomLocation,
  loadLocationsSuccess,
  removeLocationSuccess,
  SaveLocationSuccess,
} from './location.actions';

export const initialState: LocationState = { locations: [] };

export const locationsReducer = createReducer(
  initialState,
  on(loadLocationsSuccess, (state, locations) =>
    produce(state, (draft) => {
      draft.locations.splice(0, draft.locations.length);
      draft.locations.push(...locations.locations);
    })
  ),
  on(SaveLocationSuccess, (state, { location }) =>
    produce(state, (draft) => {
      const id = draft.locations.findIndex((x) => x._id == location._id);
      if (id === -1) draft.locations.push(location);
      else draft.locations[id] = location;
    })
  ),
  on(removeLocationSuccess, (state, { location }) =>
    produce(state, (draft) => {
      const index = draft.locations.findIndex((c) => c._id === location._id);
      if (index !== -1) draft.locations.splice(index, 1);
    })
  )
);
