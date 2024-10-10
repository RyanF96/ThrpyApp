import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking-dashboard',
  templateUrl: './tracking-dashboard.component.html',
  styleUrls: ['./tracking-dashboard.component.scss']
})
export class TrackingDashboardComponent implements OnInit {
  private router = inject(Router);

  itemList: any[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  /**
   *
   */
  constructor() {}

  ngOnInit(): void {
    this.itemList.push(
      { name: 'Sleep', icon: 'bed-outline', url: 'toolbar/tracking/sleep' },
      { name: 'Feeding', icon: 'beer-outline', url: 'toolbar/tracking/food' },
      { name: 'Solids', icon: 'pizza-outline', url: 'toolbar/tracking/solids' },
      { name: 'Diaper/Potty', icon: 'sad-outline', url: 'toolbar/tracking/diaper' },
      { name: 'Pumping', icon: 'breast-pump', url: 'toolbar/tracking/pumping' }
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
