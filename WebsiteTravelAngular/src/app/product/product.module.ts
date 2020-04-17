import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ProductComponent } from "./product.component";
import { ProductHeaderComponent } from "./product-header/product-header.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { ProductSellComponent } from './product-sell/product-sell.component';


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
            // {
            //     // path: ':tenPhim/homes', component: FilmSearchComponent
            // },
            // {
            //     // path: 'ves/:id', component: FilmDetailBookingIdComponent
            // },
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
        ProductSellComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [

    ],
})
export class ProductModule { }
