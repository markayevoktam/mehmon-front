import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRouteAccessGuard } from './core/user-access.guard';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';

// const ROUTES = [

// ]

// @NgModule({

//   export: [

//   ],


// })
// export class AppRoutingModule { }
const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
    {
    path:'login',
    component:LoginComponent
  },
    {
    path: 'admin',
    loadChildren: () => import("./entity/admin.module").then(m => m.AdminModule),
    canActivate: [UserRouteAccessGuard]

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
