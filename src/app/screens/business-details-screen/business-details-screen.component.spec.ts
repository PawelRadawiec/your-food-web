import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsScreenComponent } from './business-details-screen.component';

describe('BusinessDetailsScreenComponent', () => {
  let component: BusinessDetailsScreenComponent;
  let fixture: ComponentFixture<BusinessDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
