import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-get-to-know',
  templateUrl: './get-to-know.component.html',
  styleUrls: ['./get-to-know.component.scss']
})
export class GetToKnowComponent implements OnDestroy {
  private router = inject(Router);

  @ViewChild('swiper') swiperContainer: any;
  swiper: Swiper | undefined;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
