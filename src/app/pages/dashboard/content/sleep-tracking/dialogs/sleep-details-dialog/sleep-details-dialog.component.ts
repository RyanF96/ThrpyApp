import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private commonService: CommonService) {
  }

  ngOnInit() {
    this.createForm();
    this.setOptions();
  }

  createForm() {
    this.detailsForm = this.formBuilder.group({
      sleepStartIds: [[]],
      howItHappenedIds: [[]],
      endOfSleepIds: [[]]
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
    let sleepDetails = this.detailsForm.value as ISleepDetails;
    this.modalController.dismiss(sleepDetails);
  }

}
