import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }

  ngOnInit() {
  }
  onSubmitLogin(form:NgForm){
    this.user.loginUser(form.value);
    // this.user.checker();
    // this.user.loginUser(form.value)
    // .subscribe(
    //   res =>{
    //     // this.user.setuser(res.user[0]),
    //     this.router.navigateByUrl('/product')
    // },
    //   err =>alert('invalid credentials')
    // )
    // this.user.setuser(this.loggedin);
  }

}
