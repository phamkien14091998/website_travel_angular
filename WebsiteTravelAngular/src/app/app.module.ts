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
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { AuthenticationService } from "./authentication.service";
import { AuthGuardService } from "./auth-guard.service";
import { HomeService } from "./home/shared/home_service.service";

import { ManagerModule } from "./manager/manager.module";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from "./product/product.module";
import { MemberManagerModule } from "./member-manager/member-manager.module";
import { HomePostsDetailComponent } from './home/home-posts-detail/home-posts-detail.component';
import { HomePlacesDetailComponent } from './home/home-places-detail/home-places-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  // { path: 'manager', component: ManagerComponent, canActivate: [AuthGuardService] },
  // { path: 'product', component: ProductComponent },


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
    HomePostsDetailComponent,
    HomePlacesDetailComponent,

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
    BrowserAnimationsModule,
    MemberManagerModule,


  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    HomeService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
