import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MemberCollectionService } from "../../share/member_collection_service.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {
  dataDetailCollection: any = {};

  domain = environment.API_URL;
  updateCollectionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private collectionService: MemberCollectionService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        this.getDetailCollection(params['collection_id']);
      })
  }
  initForm() {
    this.updateCollectionForm = this.fb.group({
      collection_name: ['', Validators.required]
    });
  }
  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.updateCollectionForm.controls[fieldName].invalid &&
      (this.updateCollectionForm.controls[fieldName].dirty || this.updateCollectionForm.controls[fieldName].touched)
  }
  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.updateCollectionForm.controls[fieldName].errors.required;
  }
  // chi tiết lich trình
  getDetailCollection(collection_id: string) {
    this.collectionService.getDetailColectionById(
      collection_id
    ).subscribe(
      (data) => {

        this.dataDetailCollection = data
        this.updateCollectionForm.patchValue(this.dataDetailCollection)

      }, err => { console.log(err) }
    );

  }
  updateCollection() {
    const data = {
      'collection_name': this.updateCollectionForm.value.collection_name,
      'collection_id': this.dataDetailCollection?.collection_id
    }

    this.collectionService.updateCollection(
      this.dataDetailCollection?.collection_id,
      data

    ).subscribe(
      () => {
        this.toastr.success('thành công ', 'Sửa bộ sưu tập');
        this.router.navigateByUrl('/member/collection/list');
      },
      err => {
        this.toastr.error('thất bại ', 'Sửa bộ sưu tập');
      }
    )
  }

}   
