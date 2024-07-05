import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : '', pathMatch : 'full', redirectTo : 'home'},
  {path : 'home', loadChildren : () => import('./Components/home/home.module').then(m=>m.HomeModule)},
  {path : 'profile', loadChildren : () => import('./Components/user/user.module').then(m=>m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
