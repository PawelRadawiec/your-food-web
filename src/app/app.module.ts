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
import { HttpClientModule } from '@angular/common/http';
import { StarListComponent } from './components/star-list/star-list.component';
import { BusinessDetailsScreenComponent } from './screens/business-details-screen/business-details-screen.component';
import { DaysPipe } from './pipes/days.pipe';
import { HoursSeparatorPipe } from './pipes/hours-separator.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { GoogleMapsModule } from '@angular/google-maps';

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
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    HttpClientModule,
    MatDividerModule,
    GoogleMapsModule,
    NgxsModule.forRoot([BusinessState], {
      developmentMode: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
