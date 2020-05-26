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

  /**
   * Register an order into the ledger.
   * @param cart Cart to be transformed into an order and registered.
   */
  async registerOrder(cart: ShoppingCartModel): Promise<Object> {
    const order = this.initializeOrder(cart);

    return this.http.post(this.API_URL + '/registerOrder', {order}).pipe(take(1)).toPromise();
  }

  /**
   * Query for a list of orders in the ledger, given a buyerID.
   * (At the moment, the buyerID is fixed to 11111, but it should retrieve it from the AuthService in a future)
   */
  async queryOrderByUser() {
    return this.http.post(this.API_URL + '/queryOrderByUser', {buyerID: '11111'}).pipe(take(1)).toPromise();
  }

  /**
   * Initialize all the necessary attributes to transform a shopping cart into a correct order.
   * @param cart Shopping cart to be initialized.
   */
  private initializeOrder(cart) {
    cart.ID = this.generateID();
    cart.buyerID = '11111';
    cart.shopID = '44444';
    cart.date = new Date().toUTCString();
    return cart;
  }

  /**
   * Generate a random 5 digits number as a string.
   */
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
