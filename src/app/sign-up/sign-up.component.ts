import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers:[UserService]
})
export class SignUpComponent implements OnInit {
  constructor(private user:UserService) { }

  ngOnInit() {
  }
  onSubmitAddUser(form: NgForm) {
    console.log(form.value);
    this.user.addUser(form.value).subscribe(
      data =>{
        console.log('user successfully sent');
      },
      error =>{
        console.error('error in component', error)
      }
    )
  };

}
