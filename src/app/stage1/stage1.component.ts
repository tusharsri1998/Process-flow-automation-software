import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Project } from './../project';
import { Head } from './../head';
import { Stage } from './../stage';
import { User } from './../user';
import { ProductService } from './../product.service';
import { UserService } from './../user.service';
import { ToastrService } from 'ngx-toastr';
import { Checklist } from './../checklist.model';
import * as moment from 'moment';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
// import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-stage1',
  templateUrl: './stage1.component.html',
  styleUrls: ['./stage1.component.css'],
  outputs:['even']
})
export class Stage1Component implements OnInit {
  public id:String;
  public autharr:String[]=[];
  public checkifres:Boolean=false;
  public dp1:String;
  public da1:String;
  stagedata:Stage;
  public info:User;
  dat:Head[]=[];
  users:any[]=[];
  dynamicArray:Array<Checklist>=[];
  newDynamic:any={};
  formvalue:any[]=[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private router:Router,
    private route:ActivatedRoute,
    private service:ProductService,
    private user:UserService,
    private toastr: ToastrService
      ) {}

  ngOnInit() {
    this.user.givedata()
    .subscribe((res:User)=>{
      this.info = res,
      console.log(this.info)
    });
    this.newDynamic = {Item: " ", check:false};
    this.dynamicArray.push(this.newDynamic);
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.stagedata(this.id)
    .subscribe((resdat:Stage)=>{
      if(resdat){
        this.checkifres = true
        this.stagedata = resdat,
        console.log(this.stagedata)
        if(this.stagedata.stages[0]){
          this.checkifres = true
          if(this.stagedata.stages[0].proposed_date){this.dp1 = moment(this.stagedata.stages[0].proposed_date).format('YYYY-MM-DD');}
          if(this.stagedata.stages[0].actual_date){this.da1 = moment(this.stagedata.stages[0].actual_date).format('YYYY-MM-DD');}
        }
      }else{
        console.log(this.stagedata)
      }

    });
    this.user.getUsers()
    .subscribe((resData : any[]) =>console.log(resData))

    this.dropdownList = [
      { item_id: 1, item_text: 'Rajat' },
      { item_id: 2, item_text: 'Apoorv' },
      { item_id: 3, item_text: 'Tushar' },
      { item_id: 4, item_text: 'Ashwini' },
      { item_id: 5, item_text: 'tushar' },
      { item_id: 6, item_text: 'daddy' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      disabled:false
    };
    this.service.giveHead(this.id)
      .subscribe(
        (res:any[])=>{
          if(res){
            this.dat=res,
            console.log(this.dat)
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

  onItemSelect(item: any) {
    this.autharr.push(item.item_text)
    console.log(item);
    console.log(this.autharr)
  }
  onSelectAll(items: any) {
    for(var i=0;i<items.length;i++){
      this.autharr.push(items[i].item_text)
    }
    console.log(items);
  }

  checkset(form:NgForm){
    console.log(form.value);
    var z = 1;
    this.service.setcheck(form.value,this.id,z)
    .subscribe(res=>{
      console.log(res),
      alert('updated'),
      location.reload()
    })
  }

  adddoc(form:NgForm){
    console.log(form.value)
    var y = 1
    this.service.docadd(form.value,this.id,y)
    .subscribe(res=>{
      alert('Document added'),
      location.reload()
    })
  }

  dateset(form:NgForm){
    console.log(form.value)
    var p = 1
    this.service.actset(form.value,this.id,p)
    .subscribe(res=>{
      alert('Update Successful'),
      location.reload()
    })
  }

  changedate(form:NgForm){
    console.log(form.value)
    var x = 1
    this.service.datechange(form.value,this.id,x)
    .subscribe(res=>{
      alert('Update Successful'),
      location.reload()
    })
  }

  addRow(index) {
    this.newDynamic = {Item:'' , check: false};
    this.dynamicArray.push(this.newDynamic);
    this.toastr.success('New row added successfully', 'New Row');
    console.log(this.dynamicArray);
    return true;
  }
  deleteRow(index) {
  if(this.dynamicArray.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.dynamicArray.splice(index,1 );
      console.log(this.dynamicArray);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
  }
}
  approve(){
    alert('confirm');
    var s = 1
    this.user.appr(this.id,s)
    .subscribe(ress=>console.log(ress));
  }

  submitData(form: NgForm){
    console.log(form.value);
    this.service.sendstage(form.value,this.dynamicArray,this.id,this.autharr)
    .subscribe(res=>{
      console.log(res),
      alert('success'),
      this.router.navigate(['/detail',this.id])
    });
  }


}
