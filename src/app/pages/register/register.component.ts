import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkPasswords } from '../../../custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup
  hidePassword: boolean = true
  formErrorMessage: string = ''
  privacyNotAcceptedMess: string = ''
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder) {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      password: ['', Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')],
      passwordRepeat: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    })

    this.registerForm.setValidators(checkPasswords())

  }

  passwordMatchStyle() {
    const password = this.registerForm.get('password')
    const passwordRepeat = this.registerForm.get('passwordRepeat')

    if (password && passwordRepeat 
        && password.value 
        && passwordRepeat.value 
        && password.value === passwordRepeat.value 
        && password.touched 
        && passwordRepeat.touched 
        && !this.registerForm.errors?.['notSame']) {
      return { 'border': '3px solid green' }
    }
    return null
  }


  onSubmit() {
    this.submitted = true
    this.formErrorMessage = ''
    this.privacyNotAcceptedMess = ''

    if (!this.registerForm.valid && !this.registerForm.get('privacy')?.value) {
      this.formErrorMessage = 'Per registrarti devi inserire dati validi e accettare l\'informativa sulla privacy.'
      return
    }
    console.log(this.registerForm.value)
    this.registerForm.reset()
  }

  passwordVisibility(): void {
    this.hidePassword = !this.hidePassword
  }

}
