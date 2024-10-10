import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-baby-tracking',
  templateUrl: './baby-tracking.component.html',
  styleUrls: ['./baby-tracking.component.scss']
})
export class BabyTrackingComponent implements OnInit {
  private router = inject(Router);
  private settingsService = inject(SettingsService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
