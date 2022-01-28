import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailsResolver } from './resolvers/business-details.resolver';
import { BusinessDetailsScreenComponent } from './screens/business-details-screen/business-details-screen.component';
import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';
import { SearchScreenComponent } from './screens/search-screen/search-screen.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchScreenComponent,
  },
  {
    path: 'business/:id',
    component: BusinessDetailsScreenComponent,
    resolve: [BusinessDetailsResolver],
  },
  {
    path: 'error',
    component: ErrorScreenComponent,
  },
  {
    path: '**',
    component: SearchScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BusinessDetailsResolver],
})
export class AppRoutingModule {}
