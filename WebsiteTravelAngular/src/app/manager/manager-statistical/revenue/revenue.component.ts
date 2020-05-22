import { Component, OnInit } from '@angular/core';
import 'chart.js';
import { ManagerstatisticalService } from "../../share/manager_statistical.service";

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  dataDoanhThu: any = []; //  doanh thu
  dataMonth: any = []  // tháng 
  data1: any = []

  public barChartOptions = {
    scaleShowVerticalLines: false,
    Responsive: true
  }

  public barChartLabels = this.dataMonth
  public barChartType = 'bar'
  public barChartLegend = true

  public barChartData = [
    { data: this.dataDoanhThu, label: 'năm 2020' }
  ]

  constructor(
    private statisticalService: ManagerstatisticalService
  ) { }

  ngOnInit(): void {
    this.getStatisticsRevenue();
  }

  getStatisticsRevenue() {
    this.statisticalService.getStatisticsRevenue().subscribe(
      (data) => {
        this.data1 = data
        // console.log(this.data);
        this.getData();
      }
    )

  }
  getData() {
    for (let i = 0; i < this.data1.length; i++) {
      this.dataMonth.push(this.data1[i].month)
      this.dataDoanhThu.push(Number(this.data1[i].doanhThu))
    }
    // console.log(this.dataSum);


  }

}
