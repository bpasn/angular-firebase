import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './shared/services/service/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment.development';
import { ErrorHandleComponent } from './shared/error/error-handle/error-handle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-notfound/page-not-found/page-not-found.component';
// import { MatProgressBarModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorHandleComponent,
    PageNotFoundComponent,
    NavBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
