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
import { SearchScreenComponent } from './screens/search-screen/search-screen.component';
import { BusinessListComponent } from './components/business/business-list/business-list.component';
import { BusinessCardComponent } from './components/business/business-card/business-card.component';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
