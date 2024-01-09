import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  constructor(private dataService: DataService, private router: Router) { }

  isUserLoggedIn: boolean = false;
  setContext$ = new Subject();

  login(userName: string, password: string) {
    this.dataService.login(userName, password).subscribe((userId) => {
      if (userId !== null || !userId) {
        this.isUserLoggedIn = true;
        localStorage.setItem('userId', userId);
        this.setContext$.next(userId);
        this.router.navigateByUrl('/dashboard');
      }
    })
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('userId');
    this.setContext$.next(null);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.setContext$.complete();
    this.setContext$.unsubscribe();
  }

}