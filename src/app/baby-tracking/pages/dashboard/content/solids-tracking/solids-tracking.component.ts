import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { IDetails, ISolids } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-solids-tracking',
  templateUrl: './solids-tracking.component.html',
  styleUrls: ['./solids-tracking.component.scss']
})
export class SolidsTrackingComponent implements OnInit, OnDestroy {
  private commonService = inject(CommonService);
  private toastController = inject(ToastController);

  componentDestroyed$ = new Subject();
  startDate: Date | undefined;
  foodItems: IDetails[] = [];
  reactions: IDetails[] = [];
  solidsForm!: FormGroup;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.createForm();
    this.getSolidFoodOptions();
  }

  getFormControl(control: string) {
    return this.solidsForm.get(control)?.value ?? null;
  }

  getSolidFoodOptions() {
    forkJoin({
      solidFoodOptions: this.commonService.getSolidFoodOptions(),
      solidsReactionOptions: this.commonService.getSolidsReactionOptions()
    }).subscribe({
      next: (results) => {
        if (results.solidFoodOptions) {
          this.foodItems = Object.keys(results.solidFoodOptions).map((key) => ({ id: key, description: results.solidFoodOptions[key] }) as IDetails);
        }
        if (results.solidsReactionOptions) {
          this.reactions = Object.keys(results.solidsReactionOptions).map((key) => ({ id: key, description: results.solidsReactionOptions[key] }) as IDetails);
        }
      },
      error: (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    });
  }

  createForm() {
    this.solidsForm = new FormGroup({
      startTime: new FormControl(new Date(), Validators.required),
      food: new FormControl('', Validators.required),
      reactions: new FormControl(''),
      notes: new FormControl('')
    });
  }

  save() {
    if (this.solidsForm.valid) {
      const solids = this.solidsForm.value as ISolids;

      this.commonService
        .saveSolidDetails(solids)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe((res) => {
          if (res) {
            this.presentToast('Saved Successfuly!');
            this.solidsForm.reset();
          }
        });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.complete();
    this.componentDestroyed$.next(true);
  }
}
