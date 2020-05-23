import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderModel} from "../../models/order.model";

@Component({
  selector: 'app-order-info-dialog',
  templateUrl: './order-info-dialog.component.html',
  styleUrls: ['./order-info-dialog.component.scss']
})
export class OrderInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OrderModel) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
