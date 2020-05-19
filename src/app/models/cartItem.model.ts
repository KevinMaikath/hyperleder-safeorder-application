export class CartItemModel {

  ID: string;
  name: string;
  price: number;
  quantity: number;

  constructor(ID: string, name: string, price: number) {
    this.ID = ID;
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }
}
