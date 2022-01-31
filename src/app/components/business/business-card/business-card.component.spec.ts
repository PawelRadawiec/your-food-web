import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BusinessesModel } from 'src/app/models/business.model';

import { BusinessCardComponent } from './business-card.component';

describe('BusinessCardComponent', () => {
  let component: BusinessCardComponent;
  let fixture: ComponentFixture<BusinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCardComponent);
    component = fixture.componentInstance;
    const business: Partial<BusinessesModel> = {};
    business.rating = 5;
    business.categories = [
      {
        alias: 'Alias',
        title: 'Title',
      },
      {
        alias: 'Alias',
        title: 'Title',
      },
    ];
    component.business = business as BusinessesModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click in navigate', () => {
    spyOn(component, 'openDetails');
    const navigateButton = fixture.debugElement.query(
      By.css('#openDetailsButton')
    ).nativeElement;
    navigateButton.click();
    expect(component.openDetails).toHaveBeenCalled();
  });

  it('should not click in navigate button', async () => {
    component.loading = true;
    fixture.detectChanges();
    await fixture.whenStable();
    spyOn(component, 'openDetails');
    const navigationButton = fixture.debugElement.query(
      By.css('#openDetailsButton')
    )?.nativeElement;
    expect(navigationButton).toBeUndefined();
    expect(component.openDetails).not.toHaveBeenCalled();
  });

  it('should show spinner', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(
      By.css('mat-spinner')
    )?.nativeElement;
    expect(spinner).toBeDefined();
  });

  it('should hide spinner', () => {
    component.loading = false;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(
      By.css('mat-spinner')
    )?.nativeElement;
    expect(spinner).toBeUndefined();
  });

  it('should have stars list', () => {
    const starsList = fixture.debugElement.query(
      By.css('app-star-list')
    )?.nativeElement;
    expect(starsList).toBeDefined();
  });

  it('should have category list', () => {
    const categories = fixture.debugElement.queryAll(By.css('.card-category'));
    expect(categories.length).toBe(2);
  });

  it('should have image', () => {
    const image = fixture.debugElement.query(
      By.css('.card-image')
    )?.nativeElement;
    expect(image).toBeDefined();
  });
});
