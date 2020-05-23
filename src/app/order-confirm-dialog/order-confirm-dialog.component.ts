import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-order-confirm-dialog',
  templateUrl: './order-confirm-dialog.component.html',
  styleUrls: ['./order-confirm-dialog.component.scss']
})
export class OrderConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

}
