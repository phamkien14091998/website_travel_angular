import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';


@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    data: any = {};
    registerForm: FormGroup;
    errors: any[] = [];
    notifyMessage: string = '';
    noti_trung_email: string = 'email của bạn đã đươc sử dụng';

    constructor(
        private auth: AuthenticationService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {

    }

    ngOnInit() {
        this.initForm();

        // this.route.params.subscribe((params) => {
        //     if (params['registered'] === 'success') {
        //         this.notifyMessage = 'Bạn đã đăng ký thành công, bạn có thể đăng nhập bây giờ!'
        //     }
        // })
    }
    initForm() {
        this.registerForm = this.fb.group({
            user_name: ['', Validators.required],
            email: ['', [Validators.required,
            Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
            password: ['', [Validators.required,
            Validators.pattern('[a-zA-Z0-9]{5,50}')]],
            // full_name: ['', Validators.required],
            avatar: ['assets/img/img_user.PNG', Validators.required],
            date_of_birth: ['', Validators.required],
            gender: ['', Validators.required],
            // hometown: ['', Validators.required],
            // hobbies: ['', Validators.required],
        });
    }
    // kiểm tra dữ liệu nhập hợp lệ
    isInvalidForm(fieldName): boolean {
        return this.registerForm.controls[fieldName].invalid &&
            (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched)
    }
    //kiểm tra bắt buộc nhập
    isRequired(fieldName): boolean {
        return this.registerForm.controls[fieldName].errors.required;
    }
    register() {
        console.log(this.registerForm.value);

        this.auth.register(this.registerForm.value).subscribe(
            () => {
                this.toastr.success('Thành Công - Mời Bạn Đăng Nhập', 'Đăng Ký');
                this.router.navigateByUrl('/login');
            },
            err => {
                this.toastr.error('Thất Bại (Email của bạn đã được sử dụng)', 'Đăng Ký');
            }
        )
    }


}

