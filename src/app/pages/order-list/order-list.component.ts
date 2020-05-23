import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../models/order.model";
import {Router} from "@angular/router";
import {CartItemModel} from "../../models/cartItem.model";
import {MatDialog} from "@angular/material/dialog";
import {OrderInfoDialogComponent} from "../../components/order-info-dialog/order-info-dialog.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  leftMenuOpen = true;
  alreadySearched = false;

  orderList: OrderModel[];

  constructor(private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    const item = {
      ID: 'itemID',
      name: 'itemName name',
      price: 10,
      quantity: 2
    };
    const order = {
      key: '12345:44444',
      ID: '12345',
      shopID: '44444',
      buyerID: '11111',
      date: 'Sat, 23 May 2020 17:08:13 GMT',
      items: [item, item],
      totalPrice: 22,
      status: 'pending'
    };

    this.orderList = [order, order, order];
  }

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

  onSearch() {
    this.alreadySearched = true;
  }

  onShowOrderInfo(order: OrderModel) {
    this.matDialog.open(OrderInfoDialogComponent, {
      data: order,
      maxHeight: '80%',
      width: '25%',
      autoFocus: false
    });
  }
}
