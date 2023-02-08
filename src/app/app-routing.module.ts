import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './shared/services/service/auth-guard.service';
import { PageNotFoundComponent } from './components/page-notfound/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
