import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaperTrackingComponent } from './pages/dashboard/content/diaper-tracking/diaper-tracking.component';
import { FoodTrackingComponent } from './pages/dashboard/content/food-tracking/food-tracking.component';
import { PumpingTrackingComponent } from './pages/dashboard/content/pumping-tracking/pumping-tracking.component';
import { SleepTrackingComponent } from './pages/dashboard/content/sleep-tracking/sleep-tracking.component';
import { SolidsTrackingComponent } from './pages/dashboard/content/solids-tracking/solids-tracking.component';
import { TrackingDashboardComponent } from './pages/dashboard/content/tracking-dashboard/tracking-dashboard.component';
import { BabyTrackingComponent } from './pages/dashboard/baby-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackingComponent,
    children: [
      { path: 'dashboard', component: TrackingDashboardComponent},
      { path: 'sleep', component: SleepTrackingComponent },
      { path: 'food', component: FoodTrackingComponent },
      { path: 'solids', component: SolidsTrackingComponent },
      { path: 'diaper', component: DiaperTrackingComponent },
      { path: 'pumping', component: PumpingTrackingComponent },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BabyTrackingRoutingModule {}
