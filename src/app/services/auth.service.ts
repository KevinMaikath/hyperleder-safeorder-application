import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginCredentialsModel} from "../models/loginCredentials.model";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.api_url;
  auth_token = '';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  /**
   * Authenticate the user against the API, if it succeeds, it will return a token for later requests.
   * @param credentials Username and Password for the user to be authenticated.
   */
  async login(credentials: LoginCredentialsModel): Promise<Object> {
    return this.http.post(this.API_URL + '/login', credentials).pipe(take(1)).toPromise();
  }

  /**
   * Delete the auth_token and go back to '/login'.
   */
  logout() {
    this.auth_token = '';
    this.router.navigateByUrl('/login');
  }

  /**
   * Save a token as the auth_token.
   * @param token Token to be saved.
   */
  saveToken(token: string) {
    this.auth_token = token;
  }

  /**
   * Check if the auth_token exists and is valid.
   * This functions makes a request to the API, specific for checking the token.
   */
  async isAuthenticated(): Promise<boolean> {
    if (!this.auth_token) return false;

    const header = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);

    try {
      const res = await this.http.post(this.API_URL + '/checkToken', {}, {headers: header}).pipe(take(1)).toPromise();
      return !!res;
    } catch (err) {
      return false
    }
  }

}
