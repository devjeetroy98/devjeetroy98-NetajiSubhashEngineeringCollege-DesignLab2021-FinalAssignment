import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
  { 'path':'', 'redirectTo':'/login', 'pathMatch':'full' },
  { path: 'home', component:LandingPageComponent , pathMatch:'full' },
  { path: 'login', component:LoginComponentComponent , pathMatch:'full' },
  { path: 'dashboard', component:DashboardComponent , pathMatch:'full' },
  { path: 'add', component:AddComponent , pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
