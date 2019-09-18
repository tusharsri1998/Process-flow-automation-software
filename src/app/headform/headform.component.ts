import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Project } from './../project';
import { Head } from './../head';
import { NgForm } from '@angular/forms';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-headform',
  templateUrl: './headform.component.html',
  styleUrls: ['./headform.component.css']
})
export class HeadformComponent implements OnInit {
  heads:Head[]=[];
  data:Head[]=[];
  public id:String;
  public x:String='';
  ur:String;
  public exist:boolean=false;
  constructor(private service:ProductService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ur = this.router.url;
    // console.log(this.exist);
    this.service.giveHead(this.id)
      .subscribe(
        (res:any[])=>{
          if(res){
            this.data=res,
            this.exist=true
            // console.log(this.exist)
          }
          else{
            console.log('no headdata in database')
          }
        },
        err=>{
          console.log(err);
        }
      )
    }

  submitHead(form:NgForm){
    this.service.addHead(form.value,this.id)
    .subscribe(
      res=>{
        console.log(res),
        this.router.navigateByUrl('/product')
        // this.exist = true
      },
      error =>{
        console.error('error', error)
      }
    )
  };

  detailpage(){
    this.router.navigate(['/detail',this.id]);
  }

}
