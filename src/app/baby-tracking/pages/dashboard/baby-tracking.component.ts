import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-baby-tracking',
  templateUrl: './baby-tracking.component.html',
  styleUrls: ['./baby-tracking.component.scss']
})
export class BabyTrackingComponent implements OnInit {
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSettings().subscribe((res) => {
      //TODO?
    });
  }

  navigate(location: string) {
    this.router.navigateByUrl(`/${location}`);
  }
}
