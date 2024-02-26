import { ChangeDetectorRef, Component } from '@angular/core';
import { ISleep, ISleepDetails } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { DataService } from 'src/app/services/data.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SleepDetailsDialogComponent } from './dialogs/sleep-details-dialog/sleep-details-dialog.component';
import { ModalController } from '@ionic/angular';
import { TimerBase } from '../timer-base/timer-base';

@Component({
  selector: 'app-sleep-tracking',
  templateUrl: './sleep-tracking.component.html',
  styleUrls: ['./sleep-tracking.component.scss']
})
export class SleepTrackingComponent extends TimerBase {
  sleepDetails: ISleepDetails | undefined;

  constructor(private dataService: DataService, private settingsService: SettingsService, private modalController: ModalController) {
    super()
  }

  saveSleep() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const childId = JSON.parse(settings).find((x: { key: SettingsEnum; }) => x.key === SettingsEnum.SelectedChild)?.value;
      const sleep = {
        childId: childId,
        duration: this.elapsedTime,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        details: this.sleepDetails
      } as ISleep
      this.dataService.saveSleep(sleep).subscribe((res) => {
        if (res) {
          this.reset();
        }
      })
    }
  }

  async addDetails() {
    const modal = await this.modalController.create({
      component: SleepDetailsDialogComponent,
      cssClass: 'sleep-details-modal-class',
      backdropDismiss: false
    });
    modal.onDidDismiss().then((detail: any) => {
      if (detail) {
        this.sleepDetails = detail.data;
      }
    })
    return await modal.present();
  }
}
