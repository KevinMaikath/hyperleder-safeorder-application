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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  entryComponents: [OrderConfirmDialogComponent, OrderRegisterDialogComponent, CustomSnackbarComponent]
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
              private matSnackBar: MatSnackBar) {
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
    const item = this.shoppingCart.items.find(item => item.ID === product.ID);
    if (item) {
      item.quantity += 1;
    } else {
      this.shoppingCart.items.push(new CartItemModel(product.ID, product.name, product.price));
    }
  }

  get cartTotalPrice(): number {
    let total = 0;
    this.shoppingCart.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  onReset() {
    this.shoppingCart.items = [];
  }

  onConfirm() {
    // let dialogRef = this.openConfirmDialog();
    // dialogRef.afterClosed().subscribe(orderConfirmed => {
    //   if (orderConfirmed) {
    //     this.registerOrder();
    //   }
    // });

    // this.showSuccessSnack();
    this.showErrorSnack();
  }

  registerOrder() {
    // this.hyperledgerService.registerOrder(this.shoppingCart).then(res => {
    //   console.log(res);
    // }).catch(res => {
    //   console.log(res);
    // });
    this.openRegisterDialog();
    setTimeout(() => {
      this.showSuccessSnack();
    }, 3000);
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

  showSuccessSnack() {
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
      console.log('ACTION');
    })
  }

  showErrorSnack() {
    let snack = this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        success: false,
        message: 'An error occurred',
        buttonMsg: 'Log'
      }
    });
    snack.onAction().subscribe(() => {
      console.log('ACTION');
    })
  }
}
