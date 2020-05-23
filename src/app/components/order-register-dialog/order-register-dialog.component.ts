import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-order-register-dialog',
  templateUrl: './order-register-dialog.component.html',
  styleUrls: ['./order-register-dialog.component.scss']
})
export class OrderRegisterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderRegisterDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
