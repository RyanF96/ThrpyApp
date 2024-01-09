import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  itemList: any[] = [];

  constructor(private authService: AuthService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.itemList.push(
      { name: 'Sleep', icon: 'bed-outline', url: '/sleep' },
      { name: 'Feeding', icon: 'feeding-bottle', url: 'sleep' },
      { name: 'Solids', icon: 'utensils', url: 'sleep' },
      { name: 'Diaper', icon: 'diaper', url: 'sleep' },
      { name: 'Potty', icon: 'potty', url: 'sleep' },
      { name: 'Pumping', icon: 'breast-pump', url: 'sleep' },
      { name: 'Medicine', icon: 'medical-kit', url: 'sleep' },
      { name: 'Growth', icon: 'growth-chart', url: 'sleep' },
      { name: 'Temperature', icon: 'thermometer', url: 'sleep' },
      { name: 'Activity', icon: 'playground', url: 'sleep' }
    );
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSettings().subscribe((res) => { 
    });
  }

  navigateToSettings() {
    this.router.navigateByUrl('/settings');
  }

  navigate(path: string) {
    this.router.navigateByUrl(`${path}`);
  }
}
