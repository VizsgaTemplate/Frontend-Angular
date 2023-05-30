import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenPageComponent } from './open-page/open-page.component';
import { NewAdComponent } from './new-ad/new-ad.component';
import { OffersComponent } from './offers/offers.component';

const routes: Routes = [
  { path: '', component: OpenPageComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'newad', component: NewAdComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
