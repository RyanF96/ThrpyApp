import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { IUserIn } from '../data/contracts';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn = false;

  get isUserLoggedIn() {
    return this.userLoggedIn;
  }

  set setUserStatus(loggedIn: boolean) {
    this.userLoggedIn = loggedIn;
  }

  constructor(private dataService: DataService, private router: Router, private auth: Auth) {}

  register(user: IUserIn) {
    this.dataService.register(user).pipe(
      map((userId) => {
        if (userId) {
          this.setUserContext(userId);
        }
      })
    );
  }

  login(firebaseId: string) {
    return this.dataService.login(firebaseId).pipe(
      map((userId) => {
        if (userId) {
          this.setUserContext(userId);
        }
      })
    );
  }

  setUserContext(userId: string) {
    this.setUserStatus = true;
    localStorage.setItem('userId', userId);
    this.router.navigateByUrl('/thrpy');
  }

  logout(): void {
    this.setUserStatus = false;
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
