import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SleepTrackingComponent } from './pages/dashboard/content/sleep-tracking/sleep-tracking.component';
import { CircularButtonComponent } from './shared/circular-button/circular-button.component';
import { AddChildDialogComponent } from './shared/dialogs/add-child-dialog/add-child-dialog.component';
import { FoodTrackingComponent } from './pages/dashboard/content/food-tracking/food-tracking.component';
import { SleepDetailsDialogComponent } from './pages/dashboard/content/sleep-tracking/dialogs/sleep-details-dialog/sleep-details-dialog.component';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
