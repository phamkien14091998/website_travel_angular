import { Component, OnInit } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    data: any = {};
    loginForm: FormGroup;
    errors: any[] = [];
    notifyMessage: string = '';
    user_name: string = '';

    constructor(
        private auth: AuthenticationService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) { }
    ngOnInit() {
        this.initForm();

        this.route.params.subscribe((params) => {
            if (params['registered'] === 'success') {
                this.notifyMessage = 'Bạn đã đăng ký thành công, bạn có thể đăng nhập bây giờ!'
            }
        })
    }
    // form
    initForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required,
            Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
            password: ['', [Validators.required,
            Validators.pattern('[a-zA-Z0-9]{5,50}')]]
        });
    }
    // kiểm tra dữ liệu nhập hợp lệ
    isInvalidForm(fieldName): boolean {
        return this.loginForm.controls[fieldName].invalid &&
            (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
    }
    //kiểm tra bắt buộc nhập
    isRequired(fieldName): boolean {
        return this.loginForm.controls[fieldName].errors.required;
    }
    login() {
        this.auth.login(this.loginForm.value)
    }

}

