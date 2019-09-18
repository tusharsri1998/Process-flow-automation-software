import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from './../project';
import { ProductService } from './../product.service';
import { UserService } from './../user.service';
import { Stage } from './../stage';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public id:String;
  public arr:boolean[]=[]
  project:Project[]=[];
  stagedata:Stage;
  public unlock:boolean=false;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private service:ProductService,
    private user:UserService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.giveProject(this.id)
    .subscribe(
      (res:any[])=>{
        this.project= res
      }
    );
    this.service.stagedata(this.id)
    .subscribe((resdat:Stage)=>{
      this.stagedata = resdat;
      for(var i=0;i<this.stagedata.stages.length;i++){
        this.arr.push(this.stagedata.stages[i].approval)
      };

      console.log(this.arr)
    });


    // this.unlock=this.service.unlocked();
    // console.log(this.unlock);
  }

  stage1(){
    this.router.navigate(['/stage1',this.id])
  }

  stage2(){
    this.router.navigate(['/stage2',this.id])
  }

}
