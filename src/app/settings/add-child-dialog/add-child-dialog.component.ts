import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-child-dialog',
  templateUrl: './add-child-dialog.component.html',
  styleUrls: ['./add-child-dialog.component.scss']
})
export class AddChildDialogComponent implements OnInit {
  childForm!: FormGroup;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.createForm();
  }

  get isInvalid() {
    return this.childForm.get('name')?.invalid && this.childForm?.get('name')?.touched;
  }

  createForm() {
    this.childForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  closeModal() {
    this.modalController.dismiss(null);
  }

  save() {
    if (this.childForm.valid) {
      const name = this.childForm?.get('name')?.value;
      this.modalController.dismiss(name);
    }
  }
}
