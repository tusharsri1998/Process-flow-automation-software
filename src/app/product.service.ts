import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import { Head } from './head';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    public x:String='';
    public y:boolean=false;
    baseUrl:string = "http://localhost:3000/project";
    private _getUrl = '/all';
    private project : Project[] = [];
    // private bc: HttpResponse<Project> = new Project();
    constructor(private _http: HttpClient) { }

    setcheck(data,id,stageno){
      return this._http.put(this.baseUrl + '/setcheck/' + id,{'data':data,'no':stageno})
    }

    docadd(data,id,stageno){
      return this._http.put(this.baseUrl + '/docadd/' + id,{'data':data,'no':stageno})
    }

    actset(data1,id1,stageno1){
      return this._http.put(this.baseUrl + '/setactdate/' + id1,{'data':data1,'no':stageno1})
    }

    datechange(data,id,stageno){
      return this._http.put(this.baseUrl + '/changedate/' + id,{'data':data,'no':stageno})
    }

    sendstage(data,docarr,id,auth){
      console.log(auth);
      return this._http.post(this.baseUrl + '/enter/'+id, {'data':data, 'docarr':docarr,'auth':auth})
    }

    sendnewstage(data,docarr,id,auth,t){
      console.log(data, docarr);
      return this._http.post(this.baseUrl + '/newstage/'+id, {'data':data, 'docarr':docarr,'t':t,'auth':auth})
    }

    checktrue(data,user,name){
      console.log(name);
      return this._http.put(this.baseUrl + '/checktrue',{'data':data,'user':user,'name':name})
    }

    stagedata(id){
      console.log(id)
      return this._http.get(this.baseUrl + '/givestages/' + id)
    }

    getProjects(){
      const headers = new HttpHeaders().set('authorization',localStorage.getItem('id_token'));
      return this._http.get(this.baseUrl + this._getUrl,{headers:headers});
      // .pipe(map((response:HttpResponse<>)=> response));
    }

    giveProject(id){
      return this._http.get(this.baseUrl + '/project/' + id)
    }

    addProject(project:Project){
      return this._http.post(this.baseUrl+'/new',project);
    }

    updateProject(project :Project){
      console.log(Project);
      return this._http.put(this.baseUrl + '/project/' + project._id, project);
    }

    delProject(project:Project){
      console.log(project);
      return this._http.delete(this.baseUrl + '/project/' + project._id);
    }

    addHead(heads:Head,data){
      console.log(data);
      return this._http.post(this.baseUrl+'/head/'+data,heads);
    }

    giveHead(id){
      return this._http.get(this.baseUrl+'/head/'+id);
    }

    unlock(){
      this.y = true;
    }

    unlocked(){
      return this.y;
    }





    // titi(){
    //   console.log(this.x);
    //   return this.x;
    // }
}
