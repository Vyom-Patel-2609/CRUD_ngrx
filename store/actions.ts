// salesforce.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadSObjects = createAction('[Salesforce] Load SObjects');
export const setSObjects = createAction('[Salesforce] Set SObjects', props<{ sObjects: string[] }>());

export const loadFields = createAction('[Salesforce] Load Fields', props<{ selectedSObject: string }>());
export const setFields = createAction('[Salesforce] Set Fields', props<{ fields: string[] }>());

export const loadRecords = createAction('[Salesforce] Load Records', props<{ sObjectName: string, selectedFields: string[] }>());
export const setRecords = createAction('[Salesforce] Set Records', props<{ records: any[] }>());

// export const setSelectedObject = createAction('[Salesforce] Set Selected Object', props<{ selectedSObject: string }>());
// export const loadFields = createAction('[Salesforce] Load Fields', props<{ fields: string[] }>());
// export const setSelectedFields = createAction('[Salesforce] Set Selected Fields', props<{ selectedFields: string[] }>());
// export const setRecords = createAction('[Salesforce] Set Records', props<{ records: any[] }>());
