import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { ProductService } from './../product.service';
import { User } from './../user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public dis:boolean=false;
  public user_type:Number
  public info:User;
  constructor(private service:UserService,
              private product:ProductService
      ) { }

  ngOnInit() {
    this.service.givedata()
    .subscribe((res:User)=>{
      this.info = res,
      this.user_type = res.user_type,
      console.log(this.user_type)
    });
  }
  logout(){
    this.service.logout();
  }

  disable(data){
    this.dis = true;
  }

  disp(data){
    console.log(data)
    var name = 'daddy';
    this.product.checktrue(data,this.info,name).
    subscribe(res=>{
      console.log(res),
      alert('approved'),
      location.reload()
    });
  }



}
