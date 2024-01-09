import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ISetting } from '../data/contracts';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: ISetting[] = [];
  constructor(private dataService: DataService) { }



  saveSetting(setting: ISetting) {
    return this.dataService.saveSetting(setting).pipe(map((x) => {
      this.settings = this.settings.map((x) =>
        x.key === setting.key ? { ...x, value: setting.value } : x
      );
      return x;
    }));
  }

  getSettings() {
    return this.dataService.getSettings().pipe(map((settings) => {
      if (settings) {
        this.settings = settings;
      }
      return settings;
    }))
  }
}
