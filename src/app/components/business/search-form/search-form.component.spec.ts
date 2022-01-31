import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { BusinessState } from 'src/app/state/business/business.state';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([BusinessState]),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    component.types = [
      {
        name: 'Pizza',
        value: 'pizza',
      },
      {
        name: 'Burger',
        value: 'burger',
      },
    ];
    component.sortBy = [
      {
        name: 'Price',
        value: 'price',
      },
    ];
    component.prices = [
      {
        name: '$',
        value: '1',
      },
      {
        name: '$$',
        value: '2',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit onSearch', () => {
    spyOn(component.onSearch$, 'emit');
    component.onSubmit();
    expect(component.onSearch$.emit).not.toHaveBeenCalled();
  });

  it('should emit onSearch$ when form valid', () => {
    spyOn(component.onSearch$, 'emit');
    const searchForm = component.searchForm;
    searchForm.controls['location'].setValue('Gdansk');
    searchForm.controls['types'].setValue(['pizza']);
    component.onSubmit();
    expect(component.onSearch$.emit).toHaveBeenCalled();
  })

  it('should call onSearch when form valid', async () => {
    spyOn(component.onSearch$, 'emit');
    const locationInput = fixture.debugElement.query(
      By.css('#location')
    ).nativeElement;
    locationInput.value = 'Gdansk';
    locationInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const typeSelect = fixture.debugElement.query(By.css('#types'));
    typeSelect.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const matOption = typeSelect.query(By.css('.mat-option'))?.nativeElement;
    matOption.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const onSubmitButton = fixture.debugElement.query(
      By.css('#onSubmitButton')
    ).nativeElement;
    onSubmitButton.click();
    await fixture.whenStable();
    expect(component.onSearch$.emit).toHaveBeenCalled();
  });

  it('should be required: location', () => {
    const searchForm = component.searchForm;
    expect(searchForm.controls['location'].valid).toBeFalse();
    searchForm.controls['location'].setValue('Gdansk');
    expect(searchForm.controls['location'].valid).toBeTrue();
  });

  it('should be required: types', () => {
    const searchForm = component.searchForm;
    expect(searchForm.controls['types'].valid).toBeFalse();
    searchForm.controls['types'].setValue(['pizza']);
    expect(searchForm.controls['types'].valid).toBeTrue();
  });
});
