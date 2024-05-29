import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BabyTrackingRoutingModule } from './baby-tracking-routing.module';
import { FoodTrackingComponent } from './pages/dashboard/content/food-tracking/food-tracking.component';
import { SleepDetailsDialogComponent } from './pages/dashboard/content/sleep-tracking/dialogs/sleep-details-dialog/sleep-details-dialog.component';
import { SleepTrackingComponent } from './pages/dashboard/content/sleep-tracking/sleep-tracking.component';
import { SolidsTrackingComponent } from './pages/dashboard/content/solids-tracking/solids-tracking.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CircularButtonComponent } from './shared/circular-button/circular-button.component';
import { DiaperTrackingComponent } from './pages/dashboard/content/diaper-tracking/diaper-tracking.component';
import { PumpingTrackingComponent } from './pages/dashboard/content/pumping-tracking/pumping-tracking.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SleepTrackingComponent,
    CircularButtonComponent,
    FoodTrackingComponent,
    SleepDetailsDialogComponent,
    SolidsTrackingComponent,
    DiaperTrackingComponent,
    PumpingTrackingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BabyTrackingRoutingModule,
    IonicModule
  ]
})
export class BabyTrackingModule { }
