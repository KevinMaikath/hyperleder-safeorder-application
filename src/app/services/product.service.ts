import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {ProductModel} from "../models/product.model";
import {Observable} from "rxjs";

export enum categoriesEnum {
  HAMBURGERS = 'hamburgers',
  SUPPLEMENTS = 'supplements',
  BEVERAGES = 'beverages'
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCTS_REFERENCE_ROOT_URL = '/products';

  constructor(private db: AngularFireDatabase) {
  }

  getProductsFromCategory(categoryName: categoriesEnum): Observable<ProductModel[]> {
    return this.db
      .list<ProductModel>(this.PRODUCTS_REFERENCE_ROOT_URL, ref =>
        ref.orderByChild('category').equalTo(categoryName)
      ).valueChanges();
  }

  // generatePushID(): string {
  //   return this.db.createPushId();
  // }
  //
  // pushProduct(product: ProductModel) {
  //   return this.db.object(this.PRODUCTS_REFERENCE_ROOT_URL + '/' + product.ID).set(product);
  // }
}
