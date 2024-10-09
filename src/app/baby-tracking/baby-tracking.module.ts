import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BabyTrackingRoutingModule } from './baby-tracking-routing.module';
import { FoodTrackingComponent } from './pages/dashboard/content/food-tracking/food-tracking.component';
import { SleepDetailsDialogComponent } from './pages/dashboard/content/sleep-tracking/dialogs/sleep-details-dialog/sleep-details-dialog.component';
import { SleepTrackingComponent } from './pages/dashboard/content/sleep-tracking/sleep-tracking.component';
import { SolidsTrackingComponent } from './pages/dashboard/content/solids-tracking/solids-tracking.component';
import { BabyTrackingComponent } from './pages/dashboard/baby-tracking.component';
import { CircularButtonComponent } from './shared/circular-button/circular-button.component';
import { DiaperTrackingComponent } from './pages/dashboard/content/diaper-tracking/diaper-tracking.component';
import { PumpingTrackingComponent } from './pages/dashboard/content/pumping-tracking/pumping-tracking.component';
import { TrackingDashboardComponent } from './pages/dashboard/content/tracking-dashboard/tracking-dashboard.component';

@NgModule({
  declarations: [
    BabyTrackingComponent,
    SleepTrackingComponent,
    CircularButtonComponent,
    FoodTrackingComponent,
    SleepDetailsDialogComponent,
    SolidsTrackingComponent,
    DiaperTrackingComponent,
    PumpingTrackingComponent,
    TrackingDashboardComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BabyTrackingRoutingModule, IonicModule]
})
export class BabyTrackingModule {}
