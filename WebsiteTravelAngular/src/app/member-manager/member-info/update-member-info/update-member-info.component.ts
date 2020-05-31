import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MemberService } from "../../share/member_service.service";
import { environment } from "../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-member-info',
  templateUrl: './update-member-info.component.html',
  styleUrls: ['./update-member-info.component.css']
})
export class UpdateMemberInfoComponent implements OnInit {

  dataDetailUser: any = {};
  domain = environment.API_URL;
  options: { content: FormData };
  updateUserForm: FormGroup;
  myFiles: string[] = [];
  file: string;

  constructor(
    private route: ActivatedRoute,
    private userService: MemberService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        this.getDetailUser(params['user_id']);
      })
  }

  // chi tiết user
  getDetailUser(user_id: string) {
    this.userService.getUserByUserId(
      user_id
    ).subscribe(
      (data) => {
        console.log(data);

        this.dataDetailUser = data
        this.updateUserForm.patchValue(this.dataDetailUser)
      }, err => { console.log(err) }
    );

  }

  initForm() {
    this.updateUserForm = this.fb.group({
      full_name: ['', Validators.required],
      user_name: ['', Validators.required],
      email: [''],
      date_of_birth: [''],
      hometown: [''],
      gender: [''],
      hobbies: [''],
      profile: [''],
      phone_number: [''],
      address: ['']
    });
  }

  // kiểm tra dữ liệu nhập hợp lệ
  isInvalidForm(fieldName): boolean {
    return this.updateUserForm.controls[fieldName].invalid &&
      (this.updateUserForm.controls[fieldName].dirty || this.updateUserForm.controls[fieldName].touched)
  }

  //kiểm tra bắt buộc nhập
  isRequired(fieldName): boolean {
    return this.updateUserForm.controls[fieldName].errors.required;
  }

  updateUser() {
    const formData = new FormData();
    // kiểm tra nếu có chọn file
    if (this.myFiles.length) {
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append('fileUpload[]', this.myFiles[i]);
      }
    } else {
      formData.append('avatar', this.dataDetailUser.avatar);
    }

    // const body = {
    //   'full_name': this.updateUserForm.controls['full_name'].value,
    //   'user_name': this.updateUserForm.controls['user_name'].value,
    //   'hometown': this.updateUserForm.controls['hometown'].value,
    //   'hobbies': this.updateUserForm.controls['hobbies'].value,
    //   'address': this.updateUserForm.controls['address'].value,
    //   'phone_number': this.updateUserForm.controls['phone_number'].value,
    //   'user_id': this.dataDetailUser?.user_id
    // }

    formData.append('full_name', this.updateUserForm.controls['full_name'].value);
    formData.append('user_name', this.updateUserForm.controls['user_name'].value);
    formData.append('hometown', this.updateUserForm.controls['hometown'].value);
    formData.append('hobbies', this.updateUserForm.controls['hobbies'].value);
    formData.append('address', this.updateUserForm.controls['address'].value);
    formData.append('phone_number', this.updateUserForm.controls['phone_number'].value);
    formData.append('user_id', this.dataDetailUser?.user_id);

    this.options = { content: formData };

    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    console.log(formData);

    this.userService.updateUser(
      this.dataDetailUser?.user_id,
      formData
    ).subscribe(
      () => {
        this.toastr.success('Thành Công ', 'Cập nhật thông tin');
        this.router.navigateByUrl('/member/info/detail/' + this.dataDetailUser?.user_id);
      },
      err => {
        this.toastr.error('Thất Bại ', 'Cập nhật thông tin');
      }
    )
  }

  // imageUpload
  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      this.updateUserForm.get('profile').setValue(this.myFiles);
    }
  }


}
