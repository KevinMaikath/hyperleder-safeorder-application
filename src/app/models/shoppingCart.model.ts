import {CartItemModel} from "./cartItem.model";

export class ShoppingCartModel {

  ID: string;
  items: CartItemModel[];
  date: string;
  shopID: string;
  buyerID: string;


  constructor() {
    this.ID = '';
    this.items = [];
    this.date = '';
    this.shopID = '';
    this.buyerID = '';
  }
}
