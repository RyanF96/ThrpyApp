import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './standalone/sign-up/sign-up.component';
import { LoginComponent } from './standalone/login/login.component';
import { GetToKnowComponent } from './standalone/get-to-know/get-to-know.component';
import { SettingsComponent } from './standalone/settings/settings.component';
import { LayoutComponent } from './standalone/layout/layout.component';
import { SignUpChildInfoComponent } from './standalone/sign-up/sign-up-child-info/sign-up-child-info.component';
import { LandingPageComponent } from './standalone/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'get-to-know', component: GetToKnowComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-up-child-info', component: SignUpChildInfoComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'toolbar',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent
      },
      {
        path: 'tracking',
        loadChildren: () => import('./baby-tracking/baby-tracking.module').then((m) => m.BabyTrackingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
