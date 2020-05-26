import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../models/order.model";
import {Router} from "@angular/router";
import {CartItemModel} from "../../models/cartItem.model";
import {MatDialog} from "@angular/material/dialog";
import {OrderInfoDialogComponent} from "../../components/order-info-dialog/order-info-dialog.component";
import {HyperledgerService} from "../../services/hyperledger.service";
import {CustomSnackbarComponent} from "../../components/custom-snackbar/custom-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  leftMenuOpen = true;
  alreadySearched = false;
  loading = false;

  orderList: OrderModel[];

  constructor(private router: Router,
              private matDialog: MatDialog,
              private hyperledger: HyperledgerService,
              private matSnackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit(): void {
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
    return `calc(100% - ${fix}px)`;
  }

  toggleLeftMenu() {
    this.leftMenuOpen = !this.leftMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  /**
   * Search the current user orders through the HypereldgerService.
   */
  onSearch() {
    this.orderList = [];
    this.alreadySearched = true;
    this.loading = true;
    this.hyperledger.queryOrderByUser().then((res: { orderList: OrderModel[] }) => {
      this.loading = false;
      this.orderList = res.orderList;
    }).catch((res) => {
      this.loading = false;
      this.showErrorSnack();
    })
  }

  /**
   * Display a dialog with all the info from an order.
   * @param order Order to be displayed.
   */
  onShowOrderInfo(order: OrderModel) {
    this.matDialog.open(OrderInfoDialogComponent, {
      data: order,
      maxHeight: '80%',
      width: '25%',
      autoFocus: false
    });
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

  logout() {
    this.authService.logout();
  }
}
