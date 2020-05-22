import {Injectable} from '@angular/core';
import {ShoppingCartModel} from "../models/shoppingCart.model";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HyperledgerService {

  // // Configured in proxy.conf.json to avoid CORS in localhost
  // API_URL = '/api';
  API_URL = 'http://localhost:3098';

  constructor(private http: HttpClient) {
  }

  queryOrder() {

  }

  async registerOrder(cart: ShoppingCartModel) {
    this.http.post(this.API_URL + '/registerOrder', cart).pipe(take(1)).toPromise().then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
