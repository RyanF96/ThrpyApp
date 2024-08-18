import { Component, OnInit, ViewChild } from '@angular/core';
import { ISleep, ISleepDetails } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { DataService } from 'src/app/services/data.service';
import { SleepDetailsDialogComponent } from './dialogs/sleep-details-dialog/sleep-details-dialog.component';
import { ModalController } from '@ionic/angular';
import { TimerBase } from '../timer-base/timer-base';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sleep-tracking',
  templateUrl: './sleep-tracking.component.html',
  styleUrls: ['./sleep-tracking.component.scss']
})
export class SleepTrackingComponent extends TimerBase implements OnInit {
  sleepDetails: ISleepDetails | undefined | null;
  @ViewChild('startTimePopover') startTimePopover: any;
  startIsOpen = false;
  @ViewChild('endTimePopover') endTimePopover: any;
  endIsOpen = false;

  constructor(private dataService: DataService, private commonService: CommonService, private modalController: ModalController) {
    super();
  }

  ngOnInit(): void {
    this.getSleepDetailOptions();
  }

  getSleepDetailOptions() {
    this.commonService.getSleepDetailOptions().subscribe((res) => {
      //TODO?
    });
  }

  presentStartPopover(e: Event) {
    this.startTimePopover.event = e;
    this.startIsOpen = true;

    const today = new Date();
    this.startDate = today.getTime();
  }

  presentEndPopover(e: Event) {
    this.endTimePopover.event = e;
    this.endIsOpen = true;
    const today = new Date();
    this.endDate = today.getTime();
  }

  saveSleep() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const childId = JSON.parse(settings).find((x: { key: SettingsEnum }) => x.key === SettingsEnum.SelectedChild)?.value;
      const sleep = {
        childId: childId,
        duration: this.elapsedTime,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        details: this.sleepDetails
      } as ISleep;
      this.dataService.saveSleep(sleep).subscribe((res) => {
        if (res) {
          this.reset();
          this.sleepDetails = null;
        }
      });
    }
  }

  dismissStartPopover() {
    this.startTimePopover.dismiss();
  }

  dismissEndPopover() {
    this.endTimePopover.dismiss();
  }

  async addDetails() {
    const modal = await this.modalController.create({
      component: SleepDetailsDialogComponent,
      cssClass: 'sleep-details-modal-class',
      backdropDismiss: false,
      componentProps: {
        details: this.sleepDetails
      }
    });
    modal.onDidDismiss().then((detail: any) => {
      if (detail) {
        this.sleepDetails = detail.data;
      }
    });
    return await modal.present();
  }
}
