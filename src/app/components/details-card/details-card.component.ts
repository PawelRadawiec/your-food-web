import { Component, Input, OnInit } from '@angular/core';
import { BusinessDetails } from 'src/app/models/business-details.model';
import * as moment from 'moment';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css'],
})
export class DetailsCardComponent implements OnInit {
  @Input() business: Partial<BusinessDetails> = {};

  addresesDisplay: string;
  currentDayIndex: number;
  displayOpen: boolean;

  constructor() {}

  ngOnInit() {
    this.setAddresesDisplay();
    this.setCurrentDayIndex();
    this.setDisplayOpen();
  }

  goToPage() {
    window.open(this.business?.url, '_blank');
  }

  setAddresesDisplay() {
    this.addresesDisplay =
      this.business.location?.display_address.join(', ') ?? '';
  }

  setDisplayOpen() {
    this.displayOpen = this.business?.hours?.[0]?.is_open_now;
  }

  setCurrentDayIndex() {
    this.currentDayIndex = moment().isoWeekday() - 1;
  }
}
