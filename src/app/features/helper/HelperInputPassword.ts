import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

enum INPUT_TYPE {
  PASSWORD = 'password',
  TEXT = 'text',
}

export class HelperInputPassword {
  isPasswordHide: boolean = true;
  passwordIcon: IconDefinition = faEye;
  inputType: string = '';

  handlePasswordIconClick(): void {
    this.isPasswordHide = !this.isPasswordHide;

    this.passwordIcon = this.isPasswordHide ? faEye : faEyeSlash;
    this.inputType = this.isPasswordHide
      ? INPUT_TYPE.PASSWORD
      : INPUT_TYPE.TEXT;
  }
}
