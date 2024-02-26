import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  itemList: any[] = [];

  constructor(private router: Router, private settingsService: SettingsService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.itemList.push(
      { name: 'Sleep', icon: 'bed-outline', url: '/sleep' },
      { name: 'Feeding', icon: 'beer-outline', url: '/food' },
      { name: 'Solids', icon: 'pizza-outline', url: '/solids' },
      { name: 'Diaper', icon: 'sad-outline', url: 'sleep' },
      { name: 'Potty', icon: 'ear-outline', url: 'sleep' },
      { name: 'Pumping', icon: 'breast-pump', url: 'sleep' },
      { name: 'Medicine', icon: 'medical-kit', url: 'sleep' },
      { name: 'Growth', icon: 'growth-chart', url: 'sleep' },
      { name: 'Temperature', icon: 'thermometer', url: 'sleep' },
      { name: 'Activity', icon: 'playground', url: 'sleep' }
    );
    this.getSettings();
    this.getSleepDetailOptions();
  }

  getSettings() {
    this.settingsService.getSettings().subscribe((res) => {
    });
  }

  getSleepDetailOptions() {
    this.commonService.getSleepDetailOptions().subscribe((res) => {
    })
  }

  navigateToSettings() {
    this.router.navigateByUrl('/settings');
  }

  navigate(path: string) {
    this.router.navigateByUrl(`${path}`);
  }
}
