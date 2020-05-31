import {Component, OnInit} from '@angular/core';
import {LoginCredentialsModel} from "../../models/loginCredentials.model";
import {AuthService} from "../../services/auth.service";
import {CustomSnackbarComponent} from "../../components/custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: LoginCredentialsModel;

  constructor(private authService: AuthService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.credentials = new LoginCredentialsModel();
  }

  /**
   * Submit the user credentials for authenticating through the AuthService.
   */
  async onSubmit() {
    if (!this.isFormValid()) {
      this.showErrorSnack('Missing fields');
      return;
    }
    const result = await this.authService.login(this.credentials);
    if (!result.success) {
      this.showErrorSnack(result.message);
    }
  }

  isFormValid(): boolean {
    return !!this.credentials.username || !!this.credentials.password;
  }

  showErrorSnack(message: string) {
    this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        success: false,
        message,
        buttonMsg: 'Okay'
      }
    });
  }

}
