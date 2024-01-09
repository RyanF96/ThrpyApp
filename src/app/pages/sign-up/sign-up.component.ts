import { Component } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { IUserIn } from 'src/app/data/contracts';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm!: FormGroup;
  username!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;

  constructor(private dataService: DataService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.username = new FormControl(null, Validators.required),
      this.password = new FormControl(null, [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
      this.confirmPassword = new FormControl(null, Validators.required),
      this.email = new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailExistsValidator()],
        updateOn: 'change',
      });
  }

  createForm() {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword
    });
  }

  submit() {
    if (this.registerForm.valid !== true) {
      return;
    }
    let user = this.registerForm.value as IUserIn;
    this.dataService.register(user).subscribe((registered) => {
      if (registered) {
        this.authService.login(user.username, user.password);
      } else {

      }
    });
    this.registerForm.markAllAsTouched();
  }

  checkPassword(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control) => {
      const email = control.value;

      if (!email) {
        return Promise.resolve(null); // No need to check if the field is empty
      }

      return this.dataService.checkEmailExists(email).pipe(
        map(exists => (exists ? { emailExists: true } : null))
      );
    };
  }

}
