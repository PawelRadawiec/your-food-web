import { Component, Input, OnInit } from '@angular/core';
import { BusinessesModel } from 'src/app/models/business.model';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  @Input() businesses: BusinessesModel[] = [];

  constructor() {}

  ngOnInit() {}
}
