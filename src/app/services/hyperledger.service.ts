import {Injectable} from '@angular/core';
import {ShoppingCartModel} from "../models/shoppingCart.model";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HyperledgerService {

  API_URL = environment.api_url;

  constructor(private http: HttpClient) {
  }

  queryOrder() {

  }

  async registerOrder(cart: ShoppingCartModel): Promise<Object> {
    const order = this.initializeOrder(cart);

    return this.http.post(this.API_URL + '/registerOrder', {order}).pipe(take(1)).toPromise();
  }

  private initializeOrder(cart) {
    cart.ID = this.generateID();
    cart.buyerID = '11111';
    cart.shopID = '44444';
    cart.date = new Date().toUTCString();
    return cart;
  }

  private generateID() {
    let num = Math.floor(Math.random() * 100000).toString();
    if (num.length < 5) {
      const len = num.length;
      for (let i = 0; i < 5 - len; i++) {
        num = '0' + num;
      }
    }
    return num;
  }
}
