import { Component, OnInit, OnDestroy } from '@angular/core';
import { IChildDetails } from 'src/app/data/contracts';

@Component({
  standalone: false,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  defaultProfileImage = 'assets/Camera_Color_Icon.svg';
  selectedProfileImage = '';
  childProfile!: IChildDetails;

  constructor() {}

  ngOnInit() {
    this.getProfileByChildId();
  }

  getProfileByChildId() {
    this.childProfile = {
      id: '1',
      name: 'Lilly',
      gender: 'female',
      profileImage: '',
      birthDate: 1734249600000, // Epoch timestamp for December 15, 2024
      activityCount: 4
    };
  }

  getFormattedAge(birthDateEpoch: number): string {
    const birthDate = new Date(birthDateEpoch);
    const today = new Date();

    const diffInMilliseconds = today.getTime() - birthDate.getTime();
    const ageDate = new Date(diffInMilliseconds);

    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      return 'Less than one month old';
    }
  }

  ngOnDestroy() {}
}
