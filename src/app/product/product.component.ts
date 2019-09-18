import { ProductService } from './../product.service';
import { UserService } from './../user.service';
import { Project } from './../project';
import { Head } from './../head';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router, RouterModule,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {

    projects: Array<Project>;
    proj: Project[] = [];
    heads:Head[]=[];
    selectedProject:Project;
    getProject:Project;
    // private hideHead:boolean=true;
    public x:String = '';
    private hideNewProject: boolean = true;
    constructor(private service: ProductService, private user:UserService) { }

    ngOnInit() {
      this.service.getProjects()
      .subscribe((resProjectData : any[]) =>{
         this.projects = resProjectData;
         console.log(this.projects);
      })
    }

    onSelectProject(project:any){
      this.hideNewProject = true;
      // this.hideHead=true;
      this.selectedProject = project;
      // console.log(this.selectedProject);
    };
    onSubmitAddProject(form : NgForm){
      this.service.addProject(form.value)
      .subscribe(
        res =>{
          // this.x = res._id,
          console.log(this.x),
          this.projects.push(form.value),
          this.hideNewProject = true,
          // this.hideHead = false,
          form.reset()
        },
        error =>{
          console.error('error', error)
        }
      )
    };
    onUpdateProjectEvent(project:any){
      console.log(project);
      // this.getProject = Project;
      this.service.updateProject(project)
      .subscribe(
        res => project = res
      );
      console.log(this.projects);
      this.selectedProject = null;
    }


    delEvent(project:any){
      this.service.delProject(project)
      .subscribe(
        dezz => project = dezz
      );
      this.projects.splice(this.projects.indexOf(project));
      this.selectedProject = null;
    }

    newProject(){
      this.hideNewProject = false;
    }

    // submitHead(form:NgForm){
    //   console.log(form.value);
    //   this.service.addHead(form.value,this.x)
    //   .subscribe(
    //     res=>{
    //       console.log(res),
    //       this.hideHead=true
    //     },
    //     error =>{
    //       console.error('error', error)
    //     }
    //   )
    // };

}
