import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ISetting } from '../data/contracts';
import { map } from 'rxjs';
import { SettingsEnum } from '../data/enums';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private dataService: DataService) { }

  saveSetting(setting: ISetting) {
    return this.dataService.saveSetting(setting).pipe(map((x) => {
      const jsonSettings = localStorage.getItem('settings');
      if (jsonSettings) {
        let settings = JSON.parse(jsonSettings)
        settings = settings.map((x: { key: SettingsEnum; }) =>
          x.key === setting.key ? { ...x, value: setting.value } : x
        );
        localStorage.setItem('settings', JSON.stringify(settings));
      }
      return x;
    }));
  }

  getSettings() {
    return this.dataService.getSettings().pipe(map((settings) => {
      if (settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
      }
      return settings;
    }))
  }
}
