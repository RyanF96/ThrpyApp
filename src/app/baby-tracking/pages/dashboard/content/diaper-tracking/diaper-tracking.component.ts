import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { IDiaperDetails } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-diaper-tracking',
  templateUrl: './diaper-tracking.component.html',
  styleUrls: ['./diaper-tracking.component.scss']
})
export class DiaperTrackingComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private toastController = inject(ToastController);

  componentDestroyed$ = new Subject();
  selectedSegment = 'diaper';
  diaperForm!: FormGroup;
  diaperTypes = ['Pee', 'Poo', 'Mixed', 'Dry'];
  descriptions = ['Solid', 'Loose', 'Runny', 'Mucousy', 'Hard', 'Pebbles', 'Diarrhea'];
  pottyDetails = ['Sat but dry', 'Potty', 'Accident'];
  diaper = 'diaper';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  getFormControl(control: string) {
    return this.diaperForm.get(control)?.value ?? null;
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.diaper = event.detail.value;
    this.diaperForm.reset();
    this.createForm();
  }

  createForm() {
    this.diaperForm = new FormGroup({
      startTime: new FormControl(new Date(), Validators.required),
      diaperType: new FormControl('', Validators.required),
      diaperSize: new FormControl(''),
      peeSize: new FormControl(''),
      diaperColor: new FormControl(''),
      diaperDescription: new FormControl(''),
      pottyDetails: new FormControl(''),
      diaperRash: new FormControl(false),
      notes: new FormControl('')
    });
  }

  save() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const childId = JSON.parse(settings).find((x: { key: SettingsEnum }) => x.key === SettingsEnum.SelectedChild)?.value;
      const diaperData = this.diaperForm.value as IDiaperDetails;
      diaperData.type = this.diaper;
      diaperData.childId = childId;
      this.dataService
        .saveDiaperDetails(diaperData)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe((res) => {
          if (res) {
            this.createForm();
            this.presentToast('bottom');
          }
        });
    }
  }

  reset(event: any) {
    //TODO?
    this.setFormControl('diaperSize', '');
    this.setFormControl('peeSize', '');
    this.setFormControl('diaperColor', '');
    this.setFormControl('diaperDescription', '');
    this.setFormControl('diaperRash', false);
    this.setFormControl('notes', '');
  }

  setFormControl(control: string, value: any) {
    this.diaperForm.get(control)?.setValue(value);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Saved Successfuly!',
      duration: 3000,
      position: position
    });

    await toast.present();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.complete();
    this.componentDestroyed$.next(true);
  }
}
