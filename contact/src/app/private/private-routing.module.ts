import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '**',
    redirectTo: 'contact',
    pathMatch: 'full',
  }
]

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})
export class ContctRouterModule { }
