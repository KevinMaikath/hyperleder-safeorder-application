import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  leftMenuOpen = false;
  rightMenuOpen = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  get middleWidth() {
    let fix = 0;
    if (this.leftMenuOpen) {
      fix += 300;
    }
    if (this.rightMenuOpen) {
      fix += 300;
    }
    return `calc(100% - ${fix}px)`;
  }

  toggleLeftMenu() {
    this.leftMenuOpen = !this.leftMenuOpen;
    if (this.leftMenuOpen) {

    }
  }

  toggleRightMenu() {
    this.rightMenuOpen = !this.rightMenuOpen;
  }

}
