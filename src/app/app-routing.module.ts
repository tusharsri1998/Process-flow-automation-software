import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { HeadformComponent } from './headform/headform.component';
import { DetailComponent } from './detail/detail.component';
import { Stage1Component } from './stage1/stage1.component';
import { NotificationComponent } from './notification/notification.component';
import { Stage2Component } from './stage2/stage2.component';
import { Stage3Component } from './stage3/stage3.component';
import { Stage4Component } from './stage4/stage4.component';

const routes: Routes = [
  {path: '', redirectTo:'/home',pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'login', component:LoginComponent},
  {path: 'product', component:ProductComponent},
  {path: 'headform/:id', component:HeadformComponent},
  {path: 'detail/:id', component:DetailComponent},
  {path: 'stage1/:id', component:Stage1Component},
  {path: 'stage2/:id', component:Stage2Component},
  {path: 'stage3/:id', component:Stage3Component},
  {path: 'stage4/:id', component:Stage4Component},
  {path: 'notification', component:NotificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
