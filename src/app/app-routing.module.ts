import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhilosophersComponent } from './philosophers/philosophers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'philosopher', component: PhilosophersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
