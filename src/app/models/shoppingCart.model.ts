import {CartItemModel} from "./cartItem.model";

export class ShoppingCartModel {

  ID: string;
  items: CartItemModel[];
  // date, etc.?

  constructor() {
    this.ID = '';
    this.items = [];
  }
}
