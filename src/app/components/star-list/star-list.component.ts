import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-list',
  templateUrl: './star-list.component.html',
  styleUrls: ['./star-list.component.css'],
})
export class StarListComponent implements OnInit {
  @Input() rating!: number | string;
  @Input() starsLength: number = 5;
  @Input() count!: number | string | undefined;

  countDisplay!: string;
  stars: string[] = [];
  starIcons: string[] = [];

  constructor() {}

  ngOnInit() {
    this.stars = Array.from({ length: this.starsLength }, () => 'star');
    this.appendStarIcons();
    this.appendCountDisplay();
  }

  appendCountDisplay() {
    if (!this.count || Number.isNaN(this.count)) return;
    this.countDisplay = `of ${this.count}`;
  }

  appendStarIcons() {
    const rating = Number(this.rating);
    if (Number.isNaN(rating)) return;
    const isDecimal = rating % 1 !== 0;
    const ratingFloor = Math.floor(rating);
    const fullStars = this.stars.slice(0, ratingFloor);
    const emptyStars = this.stars
      .slice(ratingFloor, this.starsLength)
      .map((_) => 'star_outline');
    const starIcons = fullStars.concat(emptyStars);
    if (isDecimal) {
      starIcons[ratingFloor] = 'star_half';
    }
    this.starIcons = starIcons;
  }
}
