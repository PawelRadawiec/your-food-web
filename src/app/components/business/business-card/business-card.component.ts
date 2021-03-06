import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessesModel } from 'src/app/models/business.model';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css'],
})
export class BusinessCardComponent implements OnInit {
  @Input() business!: BusinessesModel;
  @Input() loading?: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}

  openDetails() {
    this.router.navigate([`business/${this.business.id}`]);
  }
}
