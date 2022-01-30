import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BusinessesModel } from 'src/app/models/business.model';
import { SelectedBusinessPending } from 'src/app/models/selected-business-pending.model';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';
import { BusinessState } from 'src/app/state/business/business.state';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  @Select(BusinessSelectors.selectedPending)
  selectedPending$!: Observable<SelectedBusinessPending>;
  @Input() businesses: BusinessesModel[] = [];

  constructor() {}

  ngOnInit() {}
}
