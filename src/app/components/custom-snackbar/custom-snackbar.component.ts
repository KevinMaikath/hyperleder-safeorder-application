import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

interface dataStructure {
  success: boolean,
  message: string,
  buttonMsg: string
}

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {

  constructor(private snackbarRef: MatSnackBarRef<CustomSnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onAction() {
    this.snackbarRef.dismissWithAction();
  }

}
