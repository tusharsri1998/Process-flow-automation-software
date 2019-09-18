export class Notif{
  content:string;
  approval:boolean;
  proid:string;
}



export class User {
  name:string;
  email:string;
  notify:Notif;
  user_type:Number;
}
