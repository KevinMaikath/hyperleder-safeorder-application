import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../models/order.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  leftMenuOpen = true;

  orderList: OrderModel[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.orderList = [];
  }

  get middleWidth() {
    let fix = 0;
    if (this.leftMenuOpen) {
      fix += 250;
    }
    return `calc(100% - ${fix}px)`;
  }

  toggleLeftMenu() {
    this.leftMenuOpen = !this.leftMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
