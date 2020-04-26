import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../shared/product.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-product-search-byportfolio',
  templateUrl: './product-search-byportfolio.component.html',
  styleUrls: ['./product-search-byportfolio.component.css']
})
export class ProductSearchByportfolioComponent implements OnInit {
  domain = environment.API_URL;
  dataProduct: any = [];
  portfolio_name: any = '';
  data_portfolio: any = [];
  selectedItem: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService  
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.searchProductByPortfolioId(params['portfolio_id']);
      })
    this.getProductPortfolio();
  }
  searchProductByPortfolioId(portfolio_id: string) {
    this.productService.searchByPortfolio_id(portfolio_id).subscribe(
      (data) => {

        this.dataProduct = data.map(p => {
          p.images = p.images.split("|")
          return p;
        })
        this.portfolio_name = data[0].portfolio_name;

      }, err => { console.log(err) }
    );

  }
  getProductPortfolio() {
    this.productService.getProductPortfolio().subscribe(
      (data) => {
        this.data_portfolio = data;
      }
    );
  }

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
  }


}
