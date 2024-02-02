// salesforce.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SalesforceService } from '../salesforce-service.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import  * as salesforceActions from '../store/actions'
import *  as salesforceSelectors from '../store/selectors'

@Component({
  selector: 'app-salesforce',
  templateUrl: './salesforce.component.html',
  styleUrl: './salesforce.component.css'
})
export class SalesforceComponent {
  // sObjects: string[] = [];
  sObjects$: Observable<string[]>;
  selectedSObject: string = '';
  fields$: Observable<any []>;
  selectedFields: string[] = [];
  records$ : Observable<string[]>;

  fieldhash: { [fieldName: string]: boolean } = {};
  typehash: {[fieldName: string]: string}={}
  valuehash: {[fieldName: string]: string[]}={}
  // fields: string[]=[]
  // records: any[] = [];

  urecordId: string='';
  drecordId: string='';
  update_select : boolean =false
  selectedrecord :any;
  flag : boolean = false;
  crecord: any
  fetchClicked:boolean = false;


  constructor(private salesforceService: SalesforceService, private store: Store) {

    this.sObjects$ = this.store.select(salesforceSelectors.getSObjects);
    this.fields$ = this.store.select(salesforceSelectors.getFields);
    this.records$ = this.store.select(salesforceSelectors.getRecords);
  }

  ngOnInit(): void {
      if(this.salesforceService.accessToken!=='') this.store.dispatch(salesforceActions.loadSObjects())
  }

  // getSObjects(): void {
  //   // this.salesforceService.getSObjects().subscribe((data) => {
  //   //   this.sObjects = data.sobjects.map((sobject: any) => sobject.name);
  //   // });
  // }
  
  getFields(): void {
    // this.change_flags()
    console.log(this.selectedSObject)
    // console.log(1)
    if (this.selectedSObject) {
      this.store.dispatch(salesforceActions.loadFields({selectedSObject: this.selectedSObject}))
    }

    this.fields$.subscribe((data)=>{
      data.forEach((field)=>{
        this.fieldhash[field.name]=field.updateable
        this.typehash[field.name]=field.type
        if(field.type==='picklist'){
          const drop = field.picklistValues.map((data)=> data.value)
          this.valuehash[field.name]=drop
        }
      })
    })
  }

  change_flags(){
    this.fetchClicked=false;
    this.update_select=false;
    this.urecordId=''
  }

  fetchData(): void {
    // console.log(this.fieldhash)
    // console.log(this.valuehash)
    // console.log(this.typehash)
    this.update_select=false;
    if (this.selectedSObject && this.selectedFields.length > 0) {
      this.store.dispatch(salesforceActions.loadRecords({sObjectName: this.selectedSObject, selectedFields: this.selectedFields}))
    }
    this.fetchClicked=true;
  }

  updateRecord(record: any): void {
      this.update_select=!this.update_select
      this.urecordId=record['Id']
      // console.log(this.recordId)
      this.selectedrecord = Object.keys(record).reduce((result, fieldName) => {
        if (this.fieldhash[fieldName]) {
          result[fieldName] = record[fieldName];
        }
        return result;
      }, {});

      this.crecord={...record};
      // console.log(this.selectedrecord)
  }

  finalUpdate(updatedData:any){
    console.log(this.urecordId)
    this.salesforceService.updateObjectRecord(this.selectedSObject, this.urecordId, updatedData)
        .subscribe((data) => {
          alert('Record updated successfully:');
          // Refresh data after updating
          this.fetchData();
        });
    this.update_select=!this.update_select
  }

  deleteRecord(record: any): void {
    confirm('Do you want to delete the record')
    this.drecordId = record['Id']
    console.log(this.drecordId)
    if (this.selectedSObject) {
      this.salesforceService
        .deleteObjectRecord(this.selectedSObject, this.drecordId)
        .pipe(
          catchError(error => {
            alert('This record cannot be deleted')
            return EMPTY
          })
        )
        .subscribe((data) => {
          alert('Record deleted successfully:');
          // Refresh data after deleting
          this.fetchData();
        });
    }
  }
}
