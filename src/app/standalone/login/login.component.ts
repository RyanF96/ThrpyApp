import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private auth = inject(Auth);

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  storeData: string | null = '';
  isUserLoggedIn = false;
  componentDestroyed$ = new Subject();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor(private router: Router) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    (this.email = new FormControl(null, Validators.required)), (this.password = new FormControl(null, Validators.required));
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  signIn() {
    this.router.navigate(['/toolbar']);
    // const user = this.loginForm.value;
    // signInWithEmailAndPassword(this.auth, user.email, user.password)
    //   .then((userCredential) => {
    //     if (userCredential) {
    //       this.auth.authStateReady().then(() => {
    //         const user = userCredential.user;
    //         user
    //           .getIdToken()
    //           .then((accessToken) => {
    //             localStorage.setItem('accessToken', accessToken);
    //           })
    //           .catch((error) => {
    //             console.error('Error getting access token:', error);
    //           });
    //         this.authService.login(user.uid).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     window.alert(error.message);
    //   });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
