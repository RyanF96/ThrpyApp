import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { IPumping } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { DataService } from 'src/app/services/data.service';
import { TimerBase } from '../timer-base/timer-base';

@Component({
  selector: 'app-pumping-tracking',
  templateUrl: './pumping-tracking.component.html',
  styleUrls: ['./pumping-tracking.component.scss']
})
export class PumpingTrackingComponent extends TimerBase implements OnInit, OnDestroy {
  selectedSegment = 'pumping';
  pumpingForm!: FormGroup;
  componentDestroyed$ = new Subject();

  constructor(private dataService: DataService, private toastController: ToastController) {
    super();
  }

  get pumpingFormValid() {
    return this.pumpingForm.valid && this.pumpingForm.dirty;
  }

  ngOnInit() {
    this.createForm();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail?.value ?? event;
  }

  getFormControlValue(formControl: string) {
    return this.pumpingForm.get(formControl)?.value ?? null;
  }

  createForm() {
    this.pumpingForm = new FormGroup({
      notes: new FormControl(''),
      leftRight: new FormControl(false),
      total: new FormControl(0),
      left: new FormControl(0),
      right: new FormControl(0),
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.endDate)
    });
  }

  updateTotal() {
    const newValue = this.getFormControlValue('left') + this.getFormControlValue('right');
    this.pumpingForm.get('total')?.setValue(newValue);
  }

  save() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const childId = JSON.parse(settings).find((x: { key: SettingsEnum }) => x.key === SettingsEnum.SelectedChild)?.value;
      const pumping = {
        childId: childId,
        duration: this.elapsedTime,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        notes: this.getFormControlValue('notes'),
        total: this.getFormControlValue('total'),
        left: this.getFormControlValue('left'),
        right: this.getFormControlValue('right')
      } as IPumping;

      if (pumping.total > 0) {
        this.dataService
          .savePumping(pumping)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe((res) => {
            if (res) {
              this.pumpingForm.reset();
              this.reset();
              this.presentToast('Saved Successfuly!');
            }
          });
      } else {
        this.presentToast('Please enter an amount.');
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
