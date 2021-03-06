import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MemberCollectionService } from "../../share/member_collection_service.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-detail-collection',
  templateUrl: './detail-collection.component.html',
  styleUrls: ['./detail-collection.component.css']
})
export class DetailCollectionComponent implements OnInit {
  dataDetailCollection: any = [];
  domain = environment.API_URL;
  //delete place trong colelction
  collectionPlaceIndex: number;

  constructor(
    private route: ActivatedRoute,
    private collectionService: MemberCollectionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getCollectionId(params['collection_id']);
      })
  }

  getCollectionId(collection_id: string) {

    this.collectionService.getCollectionById(
      collection_id
    ).subscribe(
      (data) => {
        this.dataDetailCollection = data.map(p => {
          p.images = p.images.split('|')
          // p.description = p.description.split('.')
          p.description = p.description.slice(0, 45)

          return p
        })

        console.log(this.dataDetailCollection);

      }, err => { console.log(err) }
    );

  }

  //delete place trong collection
  deletePlaceCollection(famous_place_id: string) {

    var data = {
      "collection_id": this.dataDetailCollection[0]?.collection_id,
      "famous_place_id": famous_place_id
    };

    this.collectionService.deletePlaceCollection(
      data
    ).subscribe(
      () => {
        this.dataDetailCollection.splice(this.collectionPlaceIndex, 1);
        this.collectionPlaceIndex = undefined;

      }, () => {

      }
    )
  }


}
