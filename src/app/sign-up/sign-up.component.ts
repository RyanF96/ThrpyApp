import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Subject, takeUntil } from 'rxjs';
import { IUserIn } from 'src/app/data/contracts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  username!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  componentDestroyed$ = new Subject();

  constructor(
    private dataService: DataService,
    private router: Router,
    private auth: Auth
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    (this.username = new FormControl(null, Validators.required)),
      (this.password = new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])),
      (this.confirmPassword = new FormControl(null, Validators.required)),
      (this.email = new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }));
  }

  createForm() {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword
    });
  }

  createFirebaseUser() {
    if (this.registerForm.valid !== true) {
      return;
    }
    const userForm = this.registerForm.value as IUserIn;
    createUserWithEmailAndPassword(this.auth, userForm.email, userForm.password)
      .then((userCredential) => {
        const user = userCredential.user;
        user
          .getIdToken()
          .then((accessToken) => {
            localStorage.setItem('accessToken', accessToken);
          })
          .catch((error) => {
            console.error('Error getting access token:', error);
          });
        const myUser = {
          email: user.email,
          username: userForm.username,
          firebaseId: user.uid,
          password: userForm.password
        } as IUserIn;
        this.dataService
          .register(myUser)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe((res) => {
            if (res) {
              this.router.navigateByUrl('/login');
            }
          });
      })
      .catch((error) => {
        console.error('Registration error:', error.code + ':' + error.message);
      });
    this.registerForm.markAllAsTouched();
  }

  checkPassword(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
