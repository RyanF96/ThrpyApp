import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodTrackingComponent } from './pages/dashboard/content/food-tracking/food-tracking.component';
import { SleepDetailsDialogComponent } from './pages/dashboard/content/sleep-tracking/dialogs/sleep-details-dialog/sleep-details-dialog.component';
import { SleepTrackingComponent } from './pages/dashboard/content/sleep-tracking/sleep-tracking.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CircularButtonComponent } from './shared/circular-button/circular-button.component';
import { AddChildDialogComponent } from './shared/dialogs/add-child-dialog/add-child-dialog.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    SettingsComponent,
    SleepTrackingComponent,
    CircularButtonComponent,
    AddChildDialogComponent,
    FoodTrackingComponent,
    SleepDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
