import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { BusinessDetailsScreenComponent } from './business-details-screen.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BusinessState } from 'src/app/state/business/business.state';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('BusinessDetailsScreenComponent', () => {
  let component: BusinessDetailsScreenComponent;
  let fixture: ComponentFixture<BusinessDetailsScreenComponent>;
  let store: Store;
  let selectSnapshotSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessDetailsScreenComponent],
      imports: [
        NgxsModule.forRoot([BusinessState]),
        RouterTestingModule,
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailsScreenComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    selectSnapshotSpy = spyOn(store, 'selectSnapshot').and.returnValue({
      businessDetails: {
        location: {
          display_address: ['address_1', 'address_2'],
        },
        coordinates: {
          latitude: 100,
          longitude: 100,
        },
      },
      reviews: [
        {
          id: '1',
        },
        {
          id: '1',
        },
      ],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should selectSnapshot', () => {
    expect(selectSnapshotSpy).toHaveBeenCalled();
  });

  // it('should join addresses', () => {
  //   expect(component.addresesDisplay).toBe('address_1, address_2');
  // });

  it('should set marker', () => {
    const setMarkerSpy = spyOn(component, 'setMarker');
    component.ngOnInit();
    const marker = component.marker;
    expect(marker.position.lat).toBe(100);
    expect(marker.position.lng).toBe(100);
    expect(setMarkerSpy).toHaveBeenCalled();
  });

  it('should set center', () => {
    const setCenterSpy = spyOn(component, 'setCenter');
    component.ngOnInit();
    const center = component.center;
    expect(center.lat).toBe(100);
    expect(center.lng).toBe(100);
    expect(setCenterSpy).toHaveBeenCalled();
  });

  it('should set reviews', () => {
    expect(component.reviews.length).toBe(2);
  });

  it('should have satr list', () => {
    const starList = fixture.debugElement.query(
      By.css('app-star-list')
    )?.nativeElement;
    expect(starList).toBeDefined();
  });

  it('should have star list', () => {
    const starList = fixture.debugElement.query(
      By.css('app-star-list')
    )?.nativeElement;
    expect(starList).toBeDefined();
  });

  it('should have details card', () => {
    const detailsCard = fixture.debugElement.query(
      By.css('.details-card')
    )?.nativeElement;
    expect(detailsCard).toBeDefined();
  });

  it('should have google map list', () => {
    const googleMap = fixture.debugElement.query(
      By.css('google-map')
    )?.nativeElement;
    expect(googleMap).toBeDefined();
  });

});
