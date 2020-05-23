import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {OrderListComponent} from "./pages/order-list/order-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'list',
    component: OrderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
