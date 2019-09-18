import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from './../product.service';
import { Project } from './../project'
import { Head } from './../head'

@Component({
  selector: 'productdata',
  templateUrl: './productdata.component.html',
  styleUrls: ['./productdata.component.css'],
  inputs: ['Project'],
  outputs: ['eventi']
})
export class ProductdataComponent implements OnInit {
  public eventi = new EventEmitter();
  // public eventii = new EventEmitter();
  pro: Project[] = [];
  // res:Head[]=[];
  constructor() { }

  ngOnInit() {
  }
  updateProject(project){
    // console.log(Project);
    this.eventi.emit(project);
  };

}
