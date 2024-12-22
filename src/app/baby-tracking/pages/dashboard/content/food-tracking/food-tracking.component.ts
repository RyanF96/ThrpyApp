import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { TimerBase } from '../timer-base/timer-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFood } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-food-tracking',
  templateUrl: './food-tracking.component.html',
  styleUrls: ['./food-tracking.component.scss']
})
export class FoodTrackingComponent extends TimerBase implements OnInit {
  private commonService = inject(CommonService);

  selectedSegment = 'nursing';
  foodForm!: FormGroup;
  foodTypes: string[] = ['Breast Milk', 'Formula', 'Tube Feeding', 'Cow Milk', 'Goat Milk', 'Soy Milk', 'Other'];

  @ViewChild('startTimePopover') startTimePopover: any;
  @ViewChild('endTimePopover') endTimePopover: any;

  constructor(...args: unknown[]);

  constructor() {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  get foodTrackingFormValid() {
    return this.foodForm.valid && this.foodForm.dirty;
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  createForm() {
    this.foodForm = new FormGroup({
      foodType: new FormControl('', Validators.required),
      notes: new FormControl('')
    });
  }

  dismissStartTimePopover() {
    this.startTimePopover.dismiss();
  }

  dismissEndTimePopover() {
    this.endTimePopover.dismiss();
  }

  save() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const childId = JSON.parse(settings).find((x: { key: SettingsEnum }) => x.key === SettingsEnum.SelectedChild)?.value;
      const food = {
        childId: childId,
        duration: this.elapsedTime,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        notes: this.foodForm.get('notes')?.value,
        foodType: this.foodForm.get('foodType')?.value !== '' ? this.foodForm.get('foodType')?.value : 'Breast Milk'
      } as IFood;
      this.commonService.saveFoodDetails(food).subscribe();
    }
  }
}
