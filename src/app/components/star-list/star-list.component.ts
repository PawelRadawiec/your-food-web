import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-list',
  templateUrl: './star-list.component.html',
  styleUrls: ['./star-list.component.css'],
})
export class StarListComponent implements OnInit {
  @Input() rating!: number | string;
  starIcons: string[] = [];

  constructor() {}

  ngOnInit() {
    this.initStarIcons();
  }

  initStarIcons() {
    const rating = Number(this.rating);
    if (Number.isNaN(rating)) {
      return;
    }
    const isDecimal = rating % 1 !== 0;
    for (let i = 0; i < Math.floor(rating); i++) {
      this.starIcons.push('star');
    }
    if (isDecimal) {
      this.starIcons[this.starIcons.length - 1] = 'star_half';
    }
  }
}
