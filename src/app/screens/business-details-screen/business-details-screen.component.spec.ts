import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { BusinessDetailsScreenComponent } from './business-details-screen.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BusinessState } from 'src/app/state/business/business.state';
import { HttpClientModule } from '@angular/common/http';

describe('BusinessDetailsScreenComponent', () => {
  let component: BusinessDetailsScreenComponent;
  let fixture: ComponentFixture<BusinessDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailsScreenComponent ],
      providers: [Store],
      imports: [
        NgxsModule.forRoot([BusinessState]),
        RouterTestingModule,
        HttpClientModule
      ],
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
