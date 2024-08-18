import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemList: any[] = [];

  constructor(private router: Router, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.itemList.push(
      { name: 'Sleep', icon: 'bed-outline', url: 'thrpy/tracking/sleep' },
      { name: 'Feeding', icon: 'beer-outline', url: 'thrpy/tracking/food' },
      { name: 'Solids', icon: 'pizza-outline', url: 'thrpy/tracking/solids' },
      { name: 'Diaper/Potty', icon: 'sad-outline', url: 'thrpy/tracking/diaper' },
      { name: 'Pumping', icon: 'breast-pump', url: 'thrpy/tracking/pumping' }
      // { name: 'Medicine', icon: 'medical-kit', url: 'sleep' },
      // { name: 'Growth', icon: 'growth-chart', url: 'sleep' },
      // { name: 'Temperature', icon: 'thermometer', url: 'sleep' },
      // { name: 'Activity', icon: 'playground', url: 'sleep' }
    );
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSettings().subscribe((res) => {
      //TODO?
    });
  }

  navigateToSettings() {
    this.router.navigateByUrl('/settings');
  }

  navigate(path: string) {
    this.router.navigateByUrl(`${path}`);
  }
}
