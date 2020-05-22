import { Component, OnInit } from '@angular/core';
import 'chart.js';
import { ManagerProductService } from "../../share/manager_product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataSum: any = []; //  sum product
  dataName: any = []  // name 
  data1: any = []

  public barChartOptions = {
    scaleShowVerticalLines: false,
    Responsive: true
  }

  public barChartLabels = this.dataName
  public barChartType = 'bar'
  public barChartLegend = true

  public barChartData = [
    { data: this.dataSum, label: 'tháng 6 năm 2020' }
  ]

  constructor(
    private productService: ManagerProductService
  ) { }

  ngOnInit(): void {
    this.getTop10Product();
  }

  getTop10Product() {
    this.productService.getTop10Product().subscribe(
      (data) => {

        this.data1 = data

        // console.log(this.data);
        this.getData();
      }
    )

  }
  getData() {
    for (let i = 0; i < this.data1.length; i++) {
      this.dataName.push(this.data1[i].product_name)
      this.dataSum.push(Number(this.data1[i].sumQuantity))
    }
    // console.log(this.dataSum);


  }


}
