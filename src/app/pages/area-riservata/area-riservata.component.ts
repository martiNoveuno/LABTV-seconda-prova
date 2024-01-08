import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css']
})
export class AreaRiservataComponent {

  loginForm!: FormGroup
  hidePassword: boolean = true
  formErrorMessage: string = ''
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder) {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    })
  }

  onSubmit() {
    this.submitted = true
    this.formErrorMessage = ''

    if (!this.loginForm.valid) {
      this.formErrorMessage = 'Per accedere alla tua area riservata devi inserire i tuoi dati.'
      return 
    }

    console.log(this.loginForm.value)
    this.loginForm.reset()
  }


  passwordVisibility(): void {
    this.hidePassword = !this.hidePassword
  }

}
