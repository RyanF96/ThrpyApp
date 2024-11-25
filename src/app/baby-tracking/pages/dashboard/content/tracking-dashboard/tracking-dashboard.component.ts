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

  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.itemList.push(
      { name: 'Sleep', src: 'assets/Sleep_Icon.svg', url: 'sleep' },
      { name: 'Feeding', src: 'assets/Feeding_Icon.svg', url: 'food' },
      { name: 'Solids', src: 'assets/Spoon_Icon.svg', url: 'solids' },
      { name: 'Diaper/Potty', src: 'assets/Diaper_Icon.svg', url: 'diaper' },
      { name: 'Pumping', src: 'assets/Pacifier_Icon.svg', url: 'pumping' }
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  trackItem(item: any): any {
    return item.id;
  }
}
