import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {OrderListComponent} from "./pages/order-list/order-list.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'list',
    component: OrderListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
