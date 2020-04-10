import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

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
    private token: string

    constructor(private http: HttpClient, private router: Router) {

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
    public isLoggedIn(): boolean {
        const users = this.getUserDetails()
        if (users) {
            return users.exp > Date.now() / 1000
        } else {
            return false
        }
    }
    public register(users: TokenPayload): Observable<any> {
        console.log(users);
        return this.http.post(`/api/register`, users, {
            headers: { 'Content-Type': 'application/json' }
        })
    }
    public login(users: TokenPayload): Observable<any> {
        const base = this.http.post(
            `/api/login`,
            { email: users.email, password: users.password },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        console.log(users);

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }
    public profile(): Observable<any> {
        return this.http.get(`/api/profile`, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        })
    }
    public logout(): void {
        this.token = ''
        window.localStorage.removeItem('usertoken')
        this.router.navigateByUrl('/')
    }


}






