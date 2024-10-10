import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BabyTrackingModule } from './baby-tracking/baby-tracking.module';

import { SignUpComponent } from './standalone/sign-up/sign-up.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './standalone/login/login.component';
import { SettingsComponent } from './standalone/settings/settings.component';
import { LayoutComponent } from './standalone/layout/layout.component';
import { AddChildDialogComponent } from './standalone/settings/add-child-dialog/add-child-dialog.component';
import { GetToKnowComponent } from './standalone/get-to-know/get-to-know.component';
import { DashboardComponent } from './standalone/dashboard/dashboard.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, GetToKnowComponent, SettingsComponent, LayoutComponent, AddChildDialogComponent, GetToKnowComponent, DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BabyTrackingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
