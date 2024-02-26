import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISolids } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-solids-tracking',
  templateUrl: './solids-tracking.component.html',
  styleUrls: ['./solids-tracking.component.scss']
})
export class SolidsTrackingComponent implements OnInit {
  startDate: Date | undefined;
  foodItems: string[] = ['avacado', 'banana', 'apple', 'cereal', 'sweet potato', 'oatmeal', 'spinach', 'chicken'];
  reactions: string[] = ['loved it', 'meh', 'hated', 'allergy or sensitivity'];
  solidsForm!: FormGroup;

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  getFormControl(control: string) {
    return this.solidsForm.get(control)?.value;
  }

  createForm() {
    this.solidsForm = new FormGroup({
      startTime: new FormControl('', Validators.required),
      food: new FormControl('', Validators.required),
      reaction: new FormControl(''),
      notes: new FormControl('')
    })
  }

  save() {
    if (this.solidsForm.valid) {
      let solids = this.solidsForm.value as ISolids;
      const settings = localStorage.getItem('settings');
      if (settings) {
        solids.childId = JSON.parse(settings).find((x: { key: SettingsEnum; }) => x.key === SettingsEnum.SelectedChild)?.value;
        this.commonService.saveSolidDetails(solids).subscribe();
      }
    }
  }
}
