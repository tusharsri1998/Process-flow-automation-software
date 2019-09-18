import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProdlistComponent } from './prodlist/prodlist.component';
import { ProductdataComponent } from './productdata/productdata.component';
import { HeadformComponent } from './headform/headform.component';
import { DetailComponent } from './detail/detail.component';
import { Stage1Component } from './stage1/stage1.component';
import { NotificationComponent } from './notification/notification.component';
import { Stage2Component } from './stage2/stage2.component';
import { Stage3Component } from './stage3/stage3.component';
import { Stage4Component } from './stage4/stage4.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    ProdlistComponent,
    ProductdataComponent,
    HeadformComponent,
    DetailComponent,
    Stage1Component,
    NotificationComponent,
    Stage2Component,
    Stage3Component,
    Stage4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()
    // NgMultiselectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

@Injectable({
  providedIn: 'root'
})
export class AppModule { }
