import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ProductComponent} from './product/product.component';
import {BasketComponent} from './basket/basket.component';
import {ResultComponent} from './result/result.component';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'contacts', component: ContactsComponent },
  {path:'product/:id', component: ProductComponent},
  {path:'basket', component: BasketComponent},
  {path:'result',component: ResultComponent},
  {path:'login', component: LoginComponent},
  {path:'account',component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
