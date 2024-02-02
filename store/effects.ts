// salesforce.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import * as salesforceActions from './actions';
import { SalesforceService } from '../salesforce-service.service';
import { Store, select } from '@ngrx/store';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
// import { selectSelectedObject, selectSelectedFields } from './selectors';

@Injectable()
export class SalesforceEffects {

  loadSObjects$ = createEffect(() => this.actions$.pipe(
    ofType(salesforceActions.loadSObjects),
    mergeMap(() => this.salesforceService.getSObjects().pipe(
      map(data => salesforceActions.setSObjects({ sObjects: data.sobjects.map((sobject: any) => sobject.name) }))
    ))
  ));

  loadFields$ = createEffect(() => this.actions$.pipe(
    ofType(salesforceActions.loadFields),
    mergeMap(action => this.salesforceService.getObjectFields(action.selectedSObject).pipe(
      map(data => salesforceActions.setFields({ fields: data.fields.map((fields: any)=> fields.name)})),

      catchError((error) => {
        console.log(error)
        return EMPTY
      })
    ))
  ));

  loadRecords$ = createEffect(() => this.actions$.pipe(
    ofType(salesforceActions.loadRecords),
    mergeMap(action => this.salesforceService.getObjectData(action.sObjectName, action.selectedFields).pipe(
      map(data => salesforceActions.setRecords({ records: data.records })),
      catchError((error) => {
        console.log(error)
        return EMPTY
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private salesforceService: SalesforceService,
    private store: Store
  ) {}
}
