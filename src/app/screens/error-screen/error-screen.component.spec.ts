import { ContentObserver } from '@angular/cdk/observers';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';
import { BusinessState } from 'src/app/state/business/business.state';

import { ErrorScreenComponent } from './error-screen.component';

describe('ErrorScreenComponent', () => {
  let component: ErrorScreenComponent;
  let fixture: ComponentFixture<ErrorScreenComponent>;
  let router: Router;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
      ],
      declarations: [ErrorScreenComponent],
      providers: [Store],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorScreenComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    store.reset({
      business: {
        errors: null,
      },
    });
    fixture.detectChanges();
  });

  it('should navigate to search when no error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const error = store.selectSnapshot((state) => state.business.errors);
    component.handleErrors(error);
    expect(navigateSpy).toHaveBeenCalledWith(['search']);
  });

  it('should not navigate to search when error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    store.reset({
      business: {
        errors: { message: 'error message' },
      },
    });
    const error = store.selectSnapshot((state) => state.business.errors);
    component.handleErrors(error);
    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });

  it('should call select', () => {
    const selectSpy = spyOn(store, 'select').and.returnValue(of({}));
    component.ngOnInit();
    expect(selectSpy).toHaveBeenCalled();
  });
});
