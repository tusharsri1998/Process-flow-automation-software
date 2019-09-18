import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'erp';
  // constructor(private user:UserService) { }
  //
  // destroy(){
  //   this.user.rem();
  // }
}
