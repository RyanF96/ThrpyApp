import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userName!: FormControl;
  password!: FormControl;
  storeData: string | null = '';
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.userName = new FormControl(null, Validators.required),
      this.password = new FormControl(null, Validators.required)
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password
    });
  }

  submit() {
    let user = this.loginForm.value;
    this.authService.login(user.userName, user.password);
  }
}
