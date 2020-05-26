import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
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

  async login(credentials: LoginCredentialsModel) {
    return this.http.post(this.API_URL + '/login', credentials).pipe(take(1)).toPromise();
  }

  saveToken(token: string) {
    this.auth_token = token;
  }

}
