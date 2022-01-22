import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchScreenComponent } from './screens/search-screen/search-screen.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
