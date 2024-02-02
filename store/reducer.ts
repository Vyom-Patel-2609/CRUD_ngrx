// salesforce.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as salesforceActions from './actions';

export interface SalesforceState {
  sObjects: string[];
  selectedSObject: string | null;
  fields: string[];
  selectedFields: string[];
  records: any[];
}

export const initialState: SalesforceState = {
  sObjects: [],
  selectedSObject: null,
  fields: [],
  selectedFields: [],
  records: []
};

export const salesforceReducer = createReducer(
  initialState,
  on(salesforceActions.setSObjects, (state, { sObjects }) => ({ ...state, sObjects })),
  on(salesforceActions.setFields, (state, { fields }) => ({ ...state, fields })),
  on(salesforceActions.setRecords, (state, { records }) => ({ ...state, records })),
//   on(salesforceActions.setSelectedObject, (state, { selectedSObject }) => ({
//     ...state,
//     selectedSObject,
//   })),

//   on(salesforceActions.setFields, (state, { fields }) => ({
//     ...state,
//     fields,
//   })),

//   on(salesforceActions.setSelectedFields, (state, { selectedFields }) => ({
//     ...state,
//     selectedFields,
//   })),

//   on(salesforceActions.setRecords, (state, { records }) => ({
//     ...state,
//     records,
//   })),
);
