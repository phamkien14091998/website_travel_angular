import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from "../authentication.service";
import { AuthGuardService } from "./../auth-guard.service";
import { ProductService } from "./shared/product.service";

import { ProductComponent } from "./product.component";
import { ProductHeaderComponent } from "./product-header/product-header.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { ProductSellComponent } from './product-sell/product-sell.component';
import { ProductSearchByportfolioComponent } from './product-search-byportfolio/product-search-byportfolio.component';



const routes: Routes = [
    {
        path: 'product', component: ProductComponent,
        children: [
            {
                path: '', component: ProductSellComponent
            }, 
            {
                path: 'list', component: ProductListComponent
            },
            {
                path: 'card', component: CardComponent
            },
            {
                path: 'search/:portfolio_id', component: ProductSearchByportfolioComponent
            },
            {
                path: 'detail/:product_id', component: ProductDetailComponent
            },
            // {
            //     // path: ':id/edit', component: FilmUpdateComponent
            // }

        ]
    }


]

@NgModule({
    declarations: [
        ProductComponent,
        ProductHeaderComponent,
        ProductDetailComponent,
        ProductListComponent,
        CardComponent,
        ProductSellComponent,
        ProductSearchByportfolioComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule,
        BrowserAnimationsModule,
        BrowserModule,

    ],
    providers: [
        AuthenticationService,
        AuthGuardService,
        ProductService

    ],
})
export class ProductModule { }
