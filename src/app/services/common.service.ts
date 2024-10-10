import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs';
import { IDetails, IFood, ISleepDetailOptions, ISolids } from '../data/contracts';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private dataService = inject(DataService);

  sleepDetailOptions: ISleepDetailOptions | undefined;

  get howSleepHappenedOptions(): IDetails[] {
    const howSleepHappened = this.sleepDetailOptions?.howSleepHappened;
    if (howSleepHappened) {
      return Object.keys(howSleepHappened).map((key) => ({ id: key, description: howSleepHappened[key] }) as IDetails);
    }
    return [];
  }

  get startSleepOptions(): IDetails[] {
    const startOfSleepDetails = this.sleepDetailOptions?.startOfSleepDetails;
    if (startOfSleepDetails) {
      return Object.keys(startOfSleepDetails).map((key) => ({ id: key, description: startOfSleepDetails[key] }) as IDetails);
    }
    return [];
  }

  get endSleepOptions(): IDetails[] {
    const endOfSleepDetails = this.sleepDetailOptions?.endOfSleepDetails;
    if (endOfSleepDetails) {
      return Object.keys(endOfSleepDetails).map((key) => ({ id: key, description: endOfSleepDetails[key] }) as IDetails);
    }
    return [];
  }

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getSleepDetailOptions() {
    return this.dataService.getSleepDetailOptions().pipe(
      map((res) => {
        if (res) {
          this.sleepDetailOptions = res;
        }
        return res;
      })
    );
  }

  saveFoodDetails(food: IFood) {
    return this.dataService.saveFoodDetails(food);
  }

  saveSolidDetails(solids: ISolids) {
    return this.dataService.saveSolidDetails(solids);
  }

  getSolidFoodOptions() {
    return this.dataService.getSolidFoodOptions();
  }

  getSolidsReactionOptions() {
    return this.dataService.getSolidsReactionOptions();
  }
}
