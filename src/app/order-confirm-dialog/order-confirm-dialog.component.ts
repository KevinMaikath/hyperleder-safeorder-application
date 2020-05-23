import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ShoppingCartModel} from "../models/shoppingCart.model";

interface dataStructure {
  shoppingCart: ShoppingCartModel,
  subtotal: number,
  taxes: number
}

@Component({
  selector: 'app-order-confirm-dialog',
  templateUrl: './order-confirm-dialog.component.html',
  styleUrls: ['./order-confirm-dialog.component.scss']
})
export class OrderConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: dataStructure) {
  }

  ngOnInit(): void {
  }

  get totalPrice(): number {
    const addition = this.data.subtotal * (this.data.taxes / 100);
    return this.data.subtotal + addition;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {

  }

}
