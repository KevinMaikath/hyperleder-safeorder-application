import {CartItemModel} from "./cartItem.model";

export interface OrderModel {
  key: string;
  ID: string;
  shopID: string;
  buyerID: string;
  date: string;
  items: CartItemModel[];
  totalPrice: number;
  status: string;
}
