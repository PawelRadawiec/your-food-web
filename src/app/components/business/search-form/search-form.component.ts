import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFormValue } from 'src/app/models/search-value.model';
import { SearchType } from 'src/app/models/type.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  @Input() types: SearchType[] = [];
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
        types: [[]],
      },
      { updateOn: 'submit' }
    );
  }
}
