import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router"; 

import { AppComponent } from './app.component';
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { ManagerComponent } from './manager/manager.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { AuthenticationService } from "./authentication.service";
import { AuthGuardService } from "./auth-guard.service";

import { ManagerModule } from "./manager/manager.module";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from "./product/product.module";
import { ProductComponent } from "./product/product.component";


import { PostDetailComponent } from "./manager/post-detail/post-detail.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  //{ path: 'manager', component: ManagerComponent, canActivate: [AuthGuardService] },
  //{ path: 'product', component: ProductComponent },

  { path: 'post-detail', component: PostDetailComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ProductModule,
    ManagerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
