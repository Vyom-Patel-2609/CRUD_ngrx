// // salesforce.selectors.ts
// import { createSelector, createFeatureSelector } from '@ngrx/store';
// import * as fromSalesforce from './reducer';

// export const selectSalesforceState = createFeatureSelector<fromSalesforce.SalesforceState>('salesforce');

// export const selectSelectedObject = createSelector(
//   selectSalesforceState,
//   (state) => state.selectedSObject
// );

// export const selectSelectedFields = createSelector(
//   selectSalesforceState,
//   (state) => state.fields
// );

// // ... other selectors
// salesforce.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesforceState } from './reducer';

const getSalesforceState = createFeatureSelector<SalesforceState>('salesforce');

export const getSObjects = createSelector(
  getSalesforceState,
  (state) => state.sObjects
);

export const getFields = createSelector(
  getSalesforceState,
  (state) => state.fields
);

export const getRecords = createSelector(
  getSalesforceState,
  (state) => state.records
);

