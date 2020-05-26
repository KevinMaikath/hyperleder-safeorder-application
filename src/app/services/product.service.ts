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
  ORDER_ADDITIONAL_TAXES = 10;

  constructor(private db: AngularFireDatabase) {
  }

  /**
   * Get all the products from a given category.
   * @param categoryName String denoting the name of the category.
   */
  getProductsFromCategory(categoryName: categoriesEnum): Observable<ProductModel[]> {
    return this.db
      .list<ProductModel>(this.PRODUCTS_REFERENCE_ROOT_URL, ref =>
        ref.orderByChild('category').equalTo(categoryName)
      ).valueChanges();
  }
}
