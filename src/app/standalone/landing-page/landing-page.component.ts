import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  defaultProfileImage: string = 'assets/Camera_Color_Icon.svg';
  selectedProfileImage: string = '';

  constructor() {}

  ngOnInit() {
    this.getActiveProfileData();
  }

  getActiveProfileData() {}

  ngOnDestroy() {}
}
