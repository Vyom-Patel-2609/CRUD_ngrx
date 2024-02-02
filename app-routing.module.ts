import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SalesforceComponent } from './salesforce/salesforce.component';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'salesforce',
    component: SalesforceComponent
  },
  {
    path: '**',
    component: TokenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
