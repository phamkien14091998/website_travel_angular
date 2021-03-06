import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';


export interface UserDetails {
    user_id: string,
    user_name: string,
    email: string,
    password: string,
    full_name: string,
    avatar: string,
    date_of_birth: Date,
    gender: number,
    hometown: string,
    hobbies: string,
    role: number,
    exp: number,
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayload {
    user_id: string,
    user_name: string,
    email: string,
    password: string,
    full_name: string,
    avatar: string,
    date_of_birth: Date,
    gender: number,
    hometown: string,
    hobbies: string,
}

@Injectable()
export class AuthenticationService {
    private readonly jwt = new JwtHelperService();
    private token: string
    user$: BehaviorSubject<any> = new BehaviorSubject(null); // kiểu Observble

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService

    ) {

    }
    private saveToken(token: string): void {
        localStorage.setItem('usertoken', token)
        this.token = token;
    }
    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('usertoken')
        }
        return this.token;
    }
    public getUserDetails(): UserDetails {
        const token = this.getToken()
        let payload
        if (token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else {
            return null
        }
    }
    // let token = this.getToken();
    // let user = this.jwt.decodeToken(token);
    // this.user$.next(user)
    // return user;

    // kiểm tra có đăng nhập hay chưa
    public haveLogin() {
        let user = this.getUserDetails()
        if (user) {
            return user.exp > Date.now() / 1000
        } else {
            return false;
        }

    }
    public isLoggedIn(): boolean {
        // const users = this.getUserDetails()
        let token = this.getToken();

        if (token) {
            let user = this.jwt.decodeToken(token);
            this.user$.next(user)
            return this.jwt.isTokenExpired(token)
        } else {
            return false
        }
    }

    public register(users: TokenPayload): Observable<any> {
        // console.log(users);
        return this.http.post(`/api/register`, users, {
            headers: { 'Content-Type': 'application/json' }
        })
    }
    public login(users: TokenPayload) {
        const base = this.http.post<any>(
            `/api/login`,
            { email: users.email, password: users.password },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        // console.log(users);
        base.subscribe(
            res => {
                let token = res.token;
                // luwu token laij
                this.saveToken(token)
                let user = this.jwt.decodeToken(token); // jwt.decode (lấy ra những giá trị như user_name  role đã gửi lên kèm token)
                this.user$.next(user)  // đưa user này tới component khác
                if (user.role == 0) {
                    this.toastr.success('Thành Công', 'Đăng Nhập');
                    this.router.navigateByUrl('/'); // nó chuyển từ login về / t đamg
                } else {
                    this.toastr.success('Thành Công', 'Đăng Nhập');
                    this.router.navigateByUrl('/manager/product');
                }
            },
            err => {
                this.toastr.error('Thất Bại', 'Đăng Nhập')
            }
        )
    }
    public profile(): Observable<any> {
        return this.http.get(`/api/profile`, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }
    public logout(): void {
        this.token = ''
        window.localStorage.removeItem('usertoken')
        // location.reload();
        // location.reload();
        this.router.navigateByUrl('/')
    }

    //////////// đăng nhập bằng google
    public logInGoogle(): Observable<any> {
        return this.http.get(`/api/auth/google/url`);
    }

    public handlerGoogle(): Observable<any> {
        return this.http.get(`/api/auth/google/callback?client_id=909426392952-9mv1bc9o1i9i1or8o3r4nsfrvrkeqb5t.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code`);
    }

    // login google
    public handlerGoogleNew() {
        const base = this.http.get<any>(
            `/api/auth/google/callback`,
        )
        // console.log(users);
        base.subscribe(
            res => {
                console.log(res);

                let token = res.token;
                // luwu token laij
                this.saveToken(token)
                let user = this.jwt.decodeToken(token); // jwt.decode (lấy ra những giá trị như user_name  role đã gửi lên kèm token)
                this.user$.next(user)  // đưa user này tới component khác
                if (user.role == 0) {
                    this.toastr.success('Thành Công', 'Đăng Nhập');
                    this.router.navigateByUrl('/'); // nó chuyển từ login về / t đamg
                } else {
                    this.toastr.success('Thành Công', 'Đăng Nhập');
                    this.router.navigateByUrl('/manager/product');
                }
            },
            err => {
                this.toastr.error('Thất Bại', 'Đăng Nhập')
            }
        )
    }

    //////////////////
    public googlelogin(tokenNew) {
        let token = tokenNew;
        // luwu token laij
        this.saveToken(token)
        let user = this.jwt.decodeToken(token); // jwt.decode (lấy ra những giá trị như user_name  role đã gửi lên kèm token)
        this.user$.next(user)  // đưa user này tới component khác
        if (user.role == 0) {
            this.toastr.success('Thành Công', 'Đăng Nhập');
            this.router.navigateByUrl('/'); // nó chuyển từ login về / t đamg
        } else {
            this.toastr.success('Thành Công', 'Đăng Nhập');
            this.router.navigateByUrl('/manager/product');
        }

    }

    // get số lượng thông báo
    public getCountNotify(data: any): Observable<any> {
        return this.http.post(`/api/schedule/getCountNotify`, data);
    }

    // get thông báo
    public getNotify(data: any): Observable<any> {
        return this.http.post(`/api/schedule/getNotify`, data);
    }
    // tắt thông báo
    public closeNotity(data: any): Observable<any> {
        return this.http.post(`/api/schedule/closeNotity`, data);
    }


}