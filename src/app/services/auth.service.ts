import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginCredentialsModel} from "../models/loginCredentials.model";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.api_url;
  auth_token = '';

  constructor(private http: HttpClient) {
  }

  async login(credentials: LoginCredentialsModel): Promise<Object> {
    return this.http.post(this.API_URL + '/login', credentials).pipe(take(1)).toPromise();
  }

  saveToken(token: string) {
    this.auth_token = token;
  }

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
