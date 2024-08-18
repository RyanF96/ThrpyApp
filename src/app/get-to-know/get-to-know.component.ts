import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-get-to-know',
  templateUrl: './get-to-know.component.html',
  styleUrls: ['./get-to-know.component.scss']
})
export class GetToKnowComponent implements OnDestroy {
  @ViewChild('swiper') swiperContainer: any;
  swiper: Swiper | undefined;

  constructor(private router: Router) {}

  swiperInit(event: any) {
    this.swiper = event.detail[0];
  }

  nextSlide() {
    if (this.swiper) {
      if (this.swiper.activeIndex === this.swiper.slides.length - 1) {
        this.router.navigate(['/sign-up']);
      } else {
        this.swiper.slideNext();
      }
    }
  }

  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = undefined;
    }
  }
}
