import { Component, Input, OnInit, Output } from '@angular/core';
import { BusinessDetails } from 'src/app/models/business-details.model';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent implements OnInit {
  @Input() business: Partial<BusinessDetails> = {};
  addresesDisplay!: string;

  constructor() { }

  ngOnInit() {
    this.setAddresesDisplay();
  }

  goToPage() {
    window.open(this.business?.url, '_blank');
  }

  setAddresesDisplay() {
    const addreses = this.business.location?.display_address.join(', ');
    this.addresesDisplay = addreses ?? '';
  }

}
