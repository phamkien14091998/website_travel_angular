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
import { CartService } from "./card/shared/cart.service";
import { PaymentService } from "./payment/shared/payment.service";

import { ManagerModule } from "./manager/manager.module";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from "./product/product.module";
import { MemberManagerModule } from "./member-manager/member-manager.module";
import { RatingModule } from 'ng-starrating';
import { ChartsModule } from 'ng2-charts';

import { HomePostsDetailComponent } from './home/home-posts-detail/home-posts-detail.component';
import { HomePlacesDetailComponent } from './home/home-places-detail/home-places-detail.component';
import { HomeListPlacesComponent } from './home/home-list-places/home-list-places.component';
import { HomeListPostsComponent } from './home/home-list-posts/home-list-posts.component';
import { HomeListProvincesComponent } from './home/home-list-provinces/home-list-provinces.component';
import { HomeListPostProvinceComponent } from './home/home-list-post-province/home-list-post-province.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeTop10UsersComponent } from './home/home-top10-users/home-top10-users.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeTop10PlacesComponent } from './home/home-top10-places/home-top10-places.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { GoogleLoginComponent } from './google-login/google-login.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },

]);
export function provideConfig() {
  return config;
}


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail-post/:post_id', component: HomePostsDetailComponent },
  { path: 'province/detail/:province_id', component: HomeListPlacesComponent }, //lấy các địa điểm trong tỉnh
  { path: 'province', component: HomeListProvincesComponent }, // lấy danh sách tất cả các tỉnh
  //{ path: 'province/:province_id', component: HomeListPostProvinceComponent }, // lấy danh sách tất cả bài viết theo tỉnh
  { path: 'place/detail/:famous_place_id', component: HomePlacesDetailComponent }, // lấy tất cả các bài viết của 1 địa điểm của tỉnh
  { path: 'post', component: HomeListPostsComponent }, // lấy tất cả các bài post
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'top-10-user', component: HomeTop10UsersComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'top-10-place', component: HomeTop10PlacesComponent },
  { path: 'google-login', component: GoogleLoginComponent },
  // { path: 'manager', component: ManagerComponent, canActivate: [AuthGuardService] },

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
    HomeListPlacesComponent,
    HomeListPostsComponent,
    HomeListProvincesComponent,
    HomeListPostProvinceComponent,
    HomeTop10UsersComponent,
    PaymentComponent,
    HomeTop10PlacesComponent,
    GoogleLoginComponent,

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
    RatingModule,
    NgbModule,
    ChartsModule,

    SocialLoginModule

  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    HomeService,
    CartService,
    PaymentService,

    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }