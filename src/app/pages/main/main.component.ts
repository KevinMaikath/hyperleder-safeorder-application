import {Component, OnInit} from '@angular/core';
import {categoriesEnum, ProductService} from "../../services/product.service";
import {ProductModel} from "../../models/product.model";
import {take} from "rxjs/operators";
import {ShoppingCartModel} from "../../models/shoppingCart.model";
import {CartItemModel} from "../../models/cartItem.model";
import {HyperledgerService} from "../../services/hyperledger.service";
import {OrderConfirmDialogComponent} from "../../components/order-confirm-dialog/order-confirm-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrderRegisterDialogComponent} from "../../components/order-register-dialog/order-register-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackbarComponent} from "../../components/custom-snackbar/custom-snackbar.component";
import {OrderInfoDialogComponent} from "../../components/order-info-dialog/order-info-dialog.component";
import {OrderModel} from "../../models/order.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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

  constructor(private productService: ProductService,
              private hyperledgerService: HyperledgerService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
  }

  async ngOnInit() {
    // necessary to be used in HTML
    this.categoriesEnum = categoriesEnum;

    this.currentProducts = await this.productService.getProductsFromCategory(categoriesEnum.HAMBURGERS)
      .pipe(take(1))
      .toPromise();
  }

  /**
   * Calculate the width for the HTML middle div content.
   * Depends on the side menus.
   */
  get middleWidth() {
    let fix = 0;
    if (this.leftMenuOpen) {
      fix += 225;
    }
    if (this.rightMenuOpen) {
      fix += 325;
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

  /**
   * Format an ingredients array to an unique string.
   * @param product Product with a list of ingredients.
   */
  displayProductIngredients(product: ProductModel): string {
    return product.ingredients.join(', ');
  }

  async onSelectCategory(category: categoriesEnum) {
    this.currentProducts = await this.productService.getProductsFromCategory(category).pipe(take(1)).toPromise();
  }

  /**
   * Add a product to the shopping cart or increase its quantity by one.
   * @param product Product to be added.
   */
  onAddProduct(product: ProductModel) {
    const item = this.shoppingCart.items.find(item => item.ID === product.ID);
    if (item) {
      item.quantity += 1;
    } else {
      this.shoppingCart.items.push(new CartItemModel(product.ID, product.name, product.price));
    }
  }

  /**
   * Calculate the shopping cart total price.
   */
  get cartTotalPrice(): number {
    let total = 0;
    this.shoppingCart.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  /**
   * Reset the shopping cart.
   */
  onReset() {
    this.shoppingCart.items = [];
  }

  /**
   * Open a confirmation dialog with all the shopping cart info.
   */
  onConfirm() {
    let dialogRef = this.openConfirmDialog();
    dialogRef.afterClosed().subscribe(orderConfirmed => {
      if (orderConfirmed) {
        this.registerOrder();
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  /**
   * Register the shopping cart as an order through the HyperledgerService.
   */
  registerOrder() {
    this.hyperledgerService.registerOrder(this.shoppingCart).then((res: OrderModel) => {
      this.showSuccessSnack(res);
    }).catch(res => {
      this.showErrorSnack();
    });
    this.openRegisterDialog();
  }

  openConfirmDialog(): MatDialogRef<any> {
    return this.matDialog.open(OrderConfirmDialogComponent, {
      data: {
        shoppingCart: this.shoppingCart,
        subtotal: this.cartTotalPrice,
        taxes: this.productService.ORDER_ADDITIONAL_TAXES
      },
      maxHeight: '80%',
      width: '25%',
      minWidth: '400px',
      autoFocus: false,
      disableClose: true
    });
  }

  openRegisterDialog(): MatDialogRef<any> {
    return this.matDialog.open(OrderRegisterDialogComponent);
  }

  showSuccessSnack(order: OrderModel) {
    let snack = this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        success: true,
        message: 'Order successfully registered!',
        buttonMsg: 'Show'
      }
    });
    snack.onAction().subscribe(() => {
      this.matDialog.open(OrderInfoDialogComponent, {
        data: order,
        maxHeight: '80%',
        width: '25%',
        autoFocus: false
      });
    })
  }

  showErrorSnack() {
    this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        success: false,
        message: 'An error occurred',
        buttonMsg: 'Okay'
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
