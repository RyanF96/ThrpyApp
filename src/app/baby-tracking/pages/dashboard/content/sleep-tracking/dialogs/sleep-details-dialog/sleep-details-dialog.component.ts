import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { IDetails, ISleepDetails } from 'src/app/data/contracts';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sleep-details-dialog',
  templateUrl: './sleep-details-dialog.component.html',
  styleUrls: ['./sleep-details-dialog.component.scss']
})
export class SleepDetailsDialogComponent implements OnInit {
  detailsForm: FormGroup = new FormGroup({});
  startSleepDetails: IDetails[] = [];
  howItHappened: IDetails[] = [];
  endOfSleep: IDetails[] = [];
  sleepDetails: ISleepDetails | undefined;

  constructor(private navParams: NavParams, private formBuilder: FormBuilder, private modalController: ModalController, private commonService: CommonService) {}

  ngOnInit() {
    this.sleepDetails = this.navParams.get('details');
    this.setOptions();
    this.createForm();
  }

  createForm() {
    this.detailsForm = this.formBuilder.group({
      sleepStartIds: [this.sleepDetails?.sleepStartIds ?? []],
      howItHappenedIds: [this.sleepDetails?.howItHappenedIds ?? []],
      endOfSleepIds: [this.sleepDetails?.endOfSleepIds ?? []]
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  setOptions() {
    this.startSleepDetails = this.commonService.startSleepOptions;
    this.endOfSleep = this.commonService.endSleepOptions;
    this.howItHappened = this.commonService.howSleepHappenedOptions;
  }

  save() {
    const sleepDetails = this.detailsForm.value as ISleepDetails;
    this.modalController.dismiss(sleepDetails);
  }
}
