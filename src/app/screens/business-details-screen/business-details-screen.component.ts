import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BusinessDetails } from 'src/app/models/business-details.model';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';
import * as _ from 'lodash';
import { BusinessScreenDetails } from 'src/app/models/business-screen-details.model';

@Component({
  selector: 'app-business-details-screen',
  templateUrl: './business-details-screen.component.html',
  styleUrls: ['./business-details-screen.component.css'],
})
export class BusinessDetailsScreenComponent implements OnInit, OnDestroy {
  business!: Partial<BusinessDetails>;
  detailsScreen!: Partial<BusinessScreenDetails>;
  subscription = new Subscription();
  addresesDisplay!: string;
  center!: google.maps.LatLngLiteral;
  marker!: any;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription.add(
      this.store
        .select(BusinessSelectors.detailsScreen)
        .subscribe((detailsScreen) => {
          this.handleDetailsScreen(detailsScreen);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToPage() {
    window.open(this.business?.url, '_blank');
  }

  handleDetailsScreen(detailsScreen: Partial<BusinessScreenDetails>) {
    this.detailsScreen = _.cloneDeep(detailsScreen);
    this.business = this.detailsScreen.businessDetails!;
    this.setAddresesDisplay();
    this.setCenter();
    this.setMarker();
  }

  setMarker() {
    const latitude = this.business.coordinates?.latitude;
    const longitude = this.business.coordinates?.longitude;
    if (!latitude || !longitude) return;
    this.marker = {
      position: {
        lat: latitude,
        lng: longitude,
      },
    };
  }

  setCenter() {
    const latitude = this.business.coordinates?.latitude;
    const longitude = this.business.coordinates?.longitude;
    if (!latitude || !longitude) return;
    this.center = {
      lat: latitude,
      lng: longitude,
    };
  }

  setAddresesDisplay() {
    const addreses = this.business.location?.display_address.join(', ');
    this.addresesDisplay = addreses ?? '';
  }
}
