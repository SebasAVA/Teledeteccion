import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { HomeUserComponent } from './components/home-user/home-user.component'
import { LoginGuard } from './guards/login.guard'
import { LoggedGuard } from './guards/logged.guard';
import { MapUserComponent} from './components/map-user/map-user.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'homeUser',
    component: HomeUserComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'mapUser',
    component: MapUserComponent,
    canActivate: [LoginGuard]
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
