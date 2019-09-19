export class Doc {
  doc_name:String;
  check:Boolean;
}

export class Stages {
  authority:Array<String>;
  auth_no:Number;
  stage_no:Number;
  approval:Boolean;
  proposed_date:Date;
  actual_date:Date;
  docinfo:Doc;
}



export class Stage {
  projid:String;
  stages:Stages;

}
