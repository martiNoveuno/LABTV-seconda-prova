import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkPasswords(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password')?.value
    const passwordRepeat = control.get('passwordRepeat')?.value
    return password && passwordRepeat && password !== passwordRepeat ? { 'notSame': true } : null
  }
}