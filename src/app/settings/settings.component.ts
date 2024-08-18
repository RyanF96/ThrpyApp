import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IChild, ISetting } from 'src/app/data/contracts';
import { SettingsEnum } from 'src/app/data/enums';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AddChildDialogComponent } from './add-child-dialog/add-child-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  children: IChild[] | undefined;
  userId: string | undefined;
  constructor(private authService: AuthService, private dataService: DataService, private modalController: ModalController, private settingsService: SettingsService) {}

  get selectedChildId(): string | undefined {
    const settings = localStorage.getItem('settings');
    if (settings) {
      const childId = JSON.parse(settings).find((x: { key: SettingsEnum }) => x.key === SettingsEnum.SelectedChild)?.value;
      return childId;
    }
    return;
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') ?? undefined;
    if (this.userId) {
      this.dataService.getUserChildren(this.userId).subscribe((res) => {
        if (res) {
          this.children = res;
        }
      });
    }
  }

  async addChild() {
    const modal = await this.modalController.create({
      component: AddChildDialogComponent
    });
    modal.onDidDismiss().then((detail: any) => {
      if (detail?.data && this.userId) {
        this.dataService.AddChild(this.userId, detail?.data).subscribe((res) => {
          if (res) {
            this.children?.push(res);
          }
        });
      }
    });
    return await modal.present();
  }

  setSelectedChild(child: IChild) {
    const setting = {
      key: SettingsEnum.SelectedChild,
      value: child.id
    } as ISetting;
    this.settingsService.saveSetting(setting).subscribe((res) => {
      //TODO?
    });
  }

  logout() {
    this.authService.logout();
  }
}
