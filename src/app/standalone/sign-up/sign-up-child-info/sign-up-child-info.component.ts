import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-up-child-info',
  templateUrl: './sign-up-child-info.component.html',
  styleUrls: ['./sign-up-child-info.component.scss']
})
export class SignUpChildInfoComponent implements OnInit, OnDestroy {
  defaultProfileImage = 'assets/Camera_Transparent_Icon.svg';
  selectedProfileImage = '';
  componentDestroyed$ = new Subject();
  selectedRelation = '';
  hasRelationSelection = false;
  childInfoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.childInfoForm = new FormGroup({
      gender: new FormControl('female', Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      dateOfBirth: new FormControl(null, Validators.required),
      premature: new FormControl(false),
      childRelation: new FormControl('', Validators.required)
    });
  }

  createForm() {
    this.childInfoForm = this.formBuilder.group({
      gender: ['female', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: [null, Validators.required],
      premature: [false],
      childRelation: ['', Validators.required]
    });
  }

  onSelectChildRelationChange(event: any) {
    const value = event.detail.value;
    if (value === '') {
      this.selectedRelation = '';
      this.hasRelationSelection = false;
      this.childInfoForm.get('childRelation')?.setValue(null);
    } else {
      this.selectedRelation = value;
      this.hasRelationSelection = true;
      this.childInfoForm.get('childRelation')?.setValue(value);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onProfileImageSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.selectedProfileImage = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onSubmit(): void {
    if (this.childInfoForm.valid) {
      console.log(this.childInfoForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
