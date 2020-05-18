import {Component, OnInit} from '@angular/core';
import {categoriesEnum, ProductService} from "../../services/product.service";
import {ProductModel} from "../../models/product.model";
import {take} from "rxjs/operators";

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

  constructor(private productService: ProductService) {
  }

  async ngOnInit() {
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
    if (this.leftMenuOpen) {

    }
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

  async onConsole() {
    const result = await this.productService.getProductsFromCategory(categoriesEnum.SUPPLEMENTS).pipe(take(1)).toPromise();
    console.log(result);
  }

  // setIngredients() {
  //   this.product.ingredients = this.ingredients.split(',');
  // }

  // async onPush() {
  //   this.setIngredients();
  //   this.product.ID = await this.productService.generatePushID();
  //   await this.productService.pushProduct(this.product);
  // }

}
