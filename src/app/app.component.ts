import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { LoginComponent } from './standalone/login/login.component';
register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ThrpyApp';
  rootPage: any = LoginComponent;
}
