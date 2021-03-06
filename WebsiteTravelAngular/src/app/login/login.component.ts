import { Component, OnInit } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { windowCount } from 'rxjs/operators';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from "@angular/common/http";

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
    urlLogin = "";

    url = "/api/auth/google/callback${this.props.location.search}"

    /////////////////
    private user
    private loggedIn: boolean;

    constructor(
        private auth: AuthenticationService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private http: HttpClient,
    ) { }
    ngOnInit() {
        this.initForm();

        this.route.params.subscribe((params) => {
            if (params['registered'] === 'success') {
                this.notifyMessage = 'Bạn đã đăng ký thành công, bạn có thể đăng nhập bây giờ!'
            }
        })

        this.getLinkLogin();
        this.handLogInGoogle()


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


    // logInGoogle() {
    //     // this.auth.logInGoogle(
    //     // ).subscribe(
    //     //     (data) => {
    //     //         console.log(data);
    //     //         this.auth.handlerGoogle(
    //     //         ).subscribe(
    //     //             () => {

    //     //             }
    //     //         )

    //     //     }
    //     // )
    //     window.location.href = this.urlLogin;

    // }
    getLinkLogin() {

        this.auth.logInGoogle(
        ).subscribe(
            (data) => {
                console.log(data)
                this.urlLogin = data.url;
                this.auth.handlerGoogle()
            })
    }
    handLogInGoogle() {
        this.auth.handlerGoogle().subscribe(
            () => {
                this.toastr.success('Thành Công', 'Đăng Nhập');
                this.router.navigateByUrl('/');
            }
        )
    }

    /////////////
    // public signinWithGoogle() {
    //     let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    //     this.auth.signIn(socialPlatformProvider)
    //         .then((userData) => {
    //             //on success
    //             //this will return user data from google. What you need is a user token which you will send it to the server
    //             this.sendToRestApiMethod(userData.idToken);
    //         });
    // }
    // sendToRestApiMethod(token: string) : void {
    //     this.http.post("url to google login in your rest api",
    //        {
    //           token: token
    //        }
    //     }).subscribe(
    //        onSuccess => {
    //           //login was successful
    //           //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
    //        }, onFail => {
    //           //login was unsuccessful
    //           //show an error message
    //        }
    //     );
    //  }

}

