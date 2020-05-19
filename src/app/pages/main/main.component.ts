import {Component, OnInit} from '@angular/core';
import {categoriesEnum, ProductService} from "../../services/product.service";
import {ProductModel} from "../../models/product.model";
import {take} from "rxjs/operators";
import {ShoppingCartModel} from "../../models/shoppingCart.model";
import {CartItemModel} from "../../models/cartItem.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  leftMenuOpen = true;
  rightMenuOpen = true;
  showCartButtons = true;

  currentProducts: ProductModel[];
  categoriesEnum;

  shoppingCart = new ShoppingCartModel();

  constructor(private productService: ProductService) {
  }

  async ngOnInit() {
    // necessary to be used in HTML
    this.categoriesEnum = categoriesEnum;

    this.currentProducts = await this.productService.getProductsFromCategory(categoriesEnum.HAMBURGERS)
      .pipe(take(1))
      .toPromise();
  }

  get middleWidth() {
    let fix = 0;
    if (this.leftMenuOpen) {
      fix += 250;
    }
    if (this.rightMenuOpen) {
      fix += 300;
    }
    return `calc(100% - ${fix}px)`;
  }

  toggleLeftMenu() {
    this.leftMenuOpen = !this.leftMenuOpen;
  }

  toggleRightMenu() {
    this.rightMenuOpen = !this.rightMenuOpen;
    if (this.rightMenuOpen) {
      setTimeout(() => {
        this.showCartButtons = true;
      }, 500);
    } else {
      this.showCartButtons = false;
    }
  }

  displayProductIngredients(product: ProductModel): string {
    return product.ingredients.join(', ');
  }

  async onSelectCategory(category: categoriesEnum) {
    this.currentProducts = await this.productService.getProductsFromCategory(category).pipe(take(1)).toPromise();
  }

  onAddProduct(product: ProductModel) {
    let item = new CartItemModel();
    item.ID = product.ID;
    item.name = product.name;
    item.price = product.price;
    item.quantity = 1;
    this.shoppingCart.items.push(item);
  }

  get cartTotalPrice(): number {
    let total = 0;
    this.shoppingCart.items.forEach(item => {
      total += item.price;
    });
    return total;
  }

  onReset() {
    this.shoppingCart.items = [];
  }

  onConfirm() {
    // TODO
  }

}
