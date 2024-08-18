import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { register } from 'swiper/element/bundle';
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
