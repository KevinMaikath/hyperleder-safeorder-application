import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginCredentialsModel} from "../models/loginCredentials.model";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";

class AuthUser {
  token: string;
  ID: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.api_url;
  private currentUser = new AuthUser();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  /**
   * Authenticate the user against the API, if it succeeds, it will save the token & userID for later requests.
   * @param credentials Username and Password for the user to be authenticated.
   */
  async login(credentials: LoginCredentialsModel): Promise<{ success: boolean, message?: string }> {
    try {
      this.currentUser = await this.http.post<AuthUser>(this.API_URL + '/login', credentials)
        .pipe(take(1))
        .toPromise();
      this.router.navigateByUrl('');
      return {success: true};
    } catch (err) {
      console.log(err);
      return {success: false, message: err.error.message};
    }
  }

  /**
   * Delete the currentUser token and go back to '/login'.
   */
  logout() {
    this.currentUser = new AuthUser();
    this.router.navigateByUrl('/login');
  }

  /**
   * Check if the currentUser exists and has a valid token.
   * This functions makes a request to the API, specific for checking the token.
   */
  async isAuthenticated(): Promise<boolean> {
    if (!this.currentUser) return false;
    console.log('currentUser', this.currentUser);

    const header = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.token}`);

    try {
      const res = await this.http.post(this.API_URL + '/checkToken', {}, {headers: header})
        .pipe(take(1))
        .toPromise();
      return !!res;
    } catch (err) {
      return false
    }
  }

}
