import { Component, OnInit, EventEmitter } from '@angular/core';
import { Project } from './../Project';
import { Head } from './../head';
import { ProductService } from './../product.service';

@Component({
  selector: 'prodlist',
  templateUrl: './prodlist.component.html',
  styleUrls: ['./prodlist.component.css'],
  inputs: ['projects'],
  outputs: ['SelectProject','eventii']
})
export class ProdlistComponent implements OnInit {
  public SelectProject = new EventEmitter();
  public eventii = new EventEmitter();
  // public SelectHead = new EventEmitter();
  constructor(private service: ProductService) { }

  ngOnInit() {
  }
  onSelect(pro: Project){
    this.SelectProject.emit(pro);
    // console.log('test');
    this.service.giveHead(pro._id)
    .subscribe(
      res=>{
        console.log(res)
        // this.SelectHead.emit(res)
      },
      err=>{
        console.log(err);
      }
    )
  }
  test(proj:Project){
    console.log(proj);
    this.eventii.emit(proj);
  }

}
