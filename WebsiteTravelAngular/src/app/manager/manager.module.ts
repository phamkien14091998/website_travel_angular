import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ManagerComponent } from './manager.component';



const routes: Routes = [
    //   { path: '', component: HomeComponent },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'register', component: RegisterComponent },
    //   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

]

@NgModule({
    declarations: [
        ManagerComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        // RouterModule.forRoot(routes),
    ],
    providers: [


    ],
    bootstrap: [ManagerComponent]
})
export class ManagerModule { }
