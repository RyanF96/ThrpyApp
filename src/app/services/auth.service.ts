import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { IUserIn } from '../data/contracts';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataService = inject(DataService);
  private router = inject(Router);
  private auth = inject(Auth);

  userLoggedIn = false;

  get isUserLoggedIn() {
    return this.userLoggedIn;
  }

  set setUserStatus(loggedIn: boolean) {
    this.userLoggedIn = loggedIn;
  }

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  register(user: IUserIn) {
    this.dataService.register(user).pipe(
      map((userId) => {
        if (userId) {
          this.setUserContext();
        }
      })
    );
  }

  login() {
    this.setUserContext();
    // return this.dataService.login(firebaseId).pipe(
    //   map((userId) => {
    //     if (userId) {
    //       this.setUserContext();
    //     }
    //   })
    // );
  }

  setUserContext() {
    this.setUserStatus = true;
    this.router.navigate(['/toolbar']);
  }

  logout(): void {
    this.setUserStatus = false;
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
