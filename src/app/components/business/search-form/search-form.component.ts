import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchFormValue } from 'src/app/models/search-value.model';
import { SearchType } from 'src/app/models/type.model';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  @Select(BusinessSelectors.searchLoading) searchLoading$?: Observable<boolean>;
  @Input() types: SearchType[] = [];
  @Input() sortBy: SearchType[] = [];
  @Input() prices: SearchType[] = [];
  @Output() onSearch$ = new EventEmitter<SearchFormValue>();

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSearchForm();
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.onSearch$.emit(this.searchForm.value);
    }
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group(
      {
        location: ['', Validators.required],
        bussinesName: [''],
        types: [[], Validators.required],
        sortBy: [[]],
        price: [[]],
        openNow: [false],
      },
      { updateOn: 'submit' }
    );
  }
}
