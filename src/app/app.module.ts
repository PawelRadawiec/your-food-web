import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { HomeComponent } from './screens/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchFormComponent } from './components/business/search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { SearchScreenComponent } from './screens/search-screen/search-screen.component';
import { BusinessListComponent } from './components/business/business-list/business-list.component';
import { BusinessCardComponent } from './components/business/business-card/business-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BusinessState } from './state/business/business.state';
import { NgxsModule } from '@ngxs/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StarListComponent } from './components/star-list/star-list.component';
import { BusinessDetailsScreenComponent } from './screens/business-details-screen/business-details-screen.component';
import { DaysPipe } from './pipes/days.pipe';
import { HoursSeparatorPipe } from './pipes/hours-separator.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchFormComponent,
    SearchScreenComponent,
    BusinessListComponent,
    BusinessCardComponent,
    StarListComponent,
    BusinessDetailsScreenComponent,
    DaysPipe,
    HoursSeparatorPipe,
    ReviewListComponent,
    ErrorScreenComponent,
    DetailsCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatGridListModule,
    HttpClientModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    NgxsModule.forRoot([BusinessState], {
      developmentMode: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
