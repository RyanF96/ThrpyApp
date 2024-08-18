import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodTrackingComponent } from './pages/dashboard/content/food-tracking/food-tracking.component';
import { SleepTrackingComponent } from './pages/dashboard/content/sleep-tracking/sleep-tracking.component';
import { SolidsTrackingComponent } from './pages/dashboard/content/solids-tracking/solids-tracking.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiaperTrackingComponent } from './pages/dashboard/content/diaper-tracking/diaper-tracking.component';
import { PumpingTrackingComponent } from './pages/dashboard/content/pumping-tracking/pumping-tracking.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'thrpy/tracking/sleep', component: SleepTrackingComponent },
  { path: 'thrpy/tracking/food', component: FoodTrackingComponent },
  { path: 'thrpy/tracking/solids', component: SolidsTrackingComponent },
  { path: 'thrpy/tracking/diaper', component: DiaperTrackingComponent },
  { path: 'thrpy/tracking/pumping', component: PumpingTrackingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BabyTrackingRoutingModule {}
