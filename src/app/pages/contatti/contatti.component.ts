import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent {

  contactForm: FormGroup
  formErrorMessage: string = ''
  privacyNotAcceptedMess: string = ''
  formSubmitted = false

  constructor(private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      messaggio: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    })
  }

  onSubmit(): void {
    this.formSubmitted = true
    //resetta i messaggi di errore
    this.formErrorMessage = ''
    this.privacyNotAcceptedMess = ''
  
    //controlla se il form è valido
    if (!this.contactForm.valid && !this.contactForm.get('privacy')?.value) {
      this.formErrorMessage = 'Per inviare il form devi compilare tutti i campi e accettare l\'informativa sulla privacy.'
      return 
    }
  
    console.log('Invio form:', this.contactForm.value)
    this.contactForm.reset()
  }

}
