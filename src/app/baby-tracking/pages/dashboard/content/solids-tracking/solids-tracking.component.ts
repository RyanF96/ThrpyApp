import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
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

  @ViewChild('startTimePopover') startTimePopover: any;

  componentDestroyed$ = new Subject();
  startDate: Date | undefined;
  foodItems: IDetails[] = [];
  reactions: IDetails[] = [];
  solidsForm!: FormGroup;
  selectedFoods: string[] = [];
  selectedReactions: string[] = [];

  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.createForm();
    this.getSolidFoodOptions();

    //TEMP - Just to test UI for multiple selects.
    this.getTempData();
  }

  get solidsFormValid() {
    return this.solidsForm.valid && this.solidsForm.dirty;
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

  getTempData() {
    //TEMP - Just to test UI for multiple selects.
    const foodItems: IDetails[] = [
      { id: '1', description: 'Apple Puree - Smooth puree made from steamed apples.' },
      { id: '2', description: 'Carrot Puree - Pureed steamed carrots with a sweet taste.' },
      { id: '3', description: 'Banana Mash - Mashed ripe bananas, rich in potassium.' },
      { id: '4', description: 'Sweet Potato Puree - Creamy sweet potato puree, a baby favorite.' },
      { id: '5', description: 'Peas Puree - Fresh peas steamed and blended into a smooth puree.' },
      { id: '6', description: 'Avocado Mash - Smoothly mashed ripe avocados.' },
      { id: '7', description: 'Pumpkin Puree - Rich orange pumpkin steamed and pureed.' },
      { id: '8', description: 'Pear Puree - Puree made from ripe, sweet pears.' },
      { id: '9', description: 'Rice Cereal - Iron-fortified rice cereal for a great start.' },
      { id: '10', description: 'Zucchini Puree - Mild-flavored zucchini steamed and pureed.' }
    ];

    this.foodItems = foodItems;

    const reactions: IDetails[] = [
      { id: '1', description: 'Rash - Skin redness or rash after eating a specific food.' },
      { id: '2', description: 'Vomiting - Baby vomits shortly after consuming a food.' },
      { id: '3', description: 'Diarrhea - Loose or watery stools following a meal.' },
      { id: '4', description: 'Constipation - Difficulty in passing stools after eating a food.' },
      { id: '5', description: 'Gassiness - Increased gas or bloating post-meal.' },
      { id: '6', description: 'Swelling - Swelling on face or body after a reaction.' },
      { id: '7', description: 'Hives - Itchy red welts appearing on skin.' },
      { id: '8', description: 'Coughing - Coughing or throat irritation during or after eating.' },
      { id: '9', description: 'Nasal Congestion - Runny or blocked nose linked to food.' },
      { id: '10', description: 'Refusal to Eat - Baby refusing to eat a specific food.' }
    ];

    this.reactions = reactions;
  }

  updateDisplaySelectedFoods(event: any): void {
    const selectedIds = event.detail.value;
    this.selectedFoods = this.foodItems.filter((food) => selectedIds.includes(food.id)).map((food) => food.description);
  }

  updateDisplaySelectedReactions(event: any): void {
    const selectedIds = event.detail.value;
    this.selectedReactions = this.reactions.filter((reaction) => selectedIds.includes(reaction.id)).map((reaction) => reaction.description);
  }

  dismissStartTimePopover() {
    this.startTimePopover.dismiss();
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
      const settings = localStorage.getItem('settings');
      if (settings) {
        solids.childId = JSON.parse(settings).find((x: { key: SettingsEnum }) => x.key === SettingsEnum.SelectedChild)?.value;
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
