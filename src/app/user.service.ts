import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
// import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = "http://localhost:3000/user";
  private _getUrl = '/signup';
  private _log = '/login';

  constructor(private http:HttpClient, private router:Router) { }

  addUser(user:User){
    // const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.post(this.baseUrl+this._getUrl, user)
  }

  getUsers(){
    return this.http.get(this.baseUrl + '/all');
    // .pipe(map((response:HttpResponse<>)=> response));
  }

  private setSession(authResult) {
        // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idtoken);
        // console.log(localStorage.getItem('id_token'));
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

  logout(){
        localStorage.removeItem("id_token");
        this.router.navigateByUrl('/');
        // localStorage.removeItem("expires_at");
    }

  givedata(){;
    var headers = new HttpHeaders().set('authorization',localStorage.getItem('id_token'));
    return this.http.get(this.baseUrl + '/info', {headers:headers})
  }

  delay(){
    return this.http.get(this.baseUrl + '/notifyadmin')
  }

  // checktrue(data){
  //   return this.http.put()
  // }
  loginUser(user){
    return this.http.post(this.baseUrl+this._log,user)
          .subscribe(res=>{
            this.setSession(res),
            this.router.navigateByUrl('/notification')
          },
          err =>alert('invalid credentials')
        );
  }

  appr(id,s){
    return this.http.post(this.baseUrl + '/appr',{'id':id,'s':s})
  }




}
