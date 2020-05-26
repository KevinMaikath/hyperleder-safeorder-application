import {Component, OnInit} from '@angular/core';
import {LoginCredentialsModel} from "../../models/loginCredentials.model";
import {AuthService} from "../../services/auth.service";
import {CustomSnackbarComponent} from "../../components/custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: LoginCredentialsModel;

  constructor(private authService: AuthService,
              private matSnackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.credentials = new LoginCredentialsModel();
  }

  /**
   * Submit the user credentials for authenticating through the AuthService.
   */
  onSubmit() {
    this.authService.login(this.credentials).then((res: { token: string }) => {
      this.authService.saveToken(res.token);
      this.router.navigateByUrl('');
    }).catch(res => {
      this.showErrorSnack(res.error.message);
    });
  }

  showErrorSnack(message: string) {
    let snack = this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
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
