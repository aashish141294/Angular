import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
   // Student form
   form = {
    "id":0,
    "firstName":"",
    "lastName":"",
    "email":"",
    "dob":"",
    "mobileNumber":"",
    "college_ID":""
  }

  // Input errors
  inputError = {
    "firstName":"",
    "lastName":"",
    "email":"",
    "dob":"",
    "mobileNumber":"",
    "college_ID":""
  }

  // Server success/fail message
  message = "";

  // Server error
  success:boolean = true;

  constructor(private aroute:ActivatedRoute,private router:Router,private service:StudentService) { }

  //Display a record if primary key is used

  ngOnInit(){
    var _self = this
    this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id") || "{}")
    if (!isNaN(this.form.id) && (this.form.id) > 0){
      this.service.get(this.form.id, function(res:any,error:any){
        if (error){
          alert(" ngOninit Error: " + error.message);
          return;
        }
        _self.form = res.data;
        
      });
    }
    this.preload();
  };
  /**
   * Save a record
   */
  save(){
    var _self = this;
    this.ngOnInit();
    if (isNaN(this.form.id)){
      this.form.id = 0;
    }
    this.service.save(this.form, function(res:any,error:any){
      if (res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        return;
      }
      _self.success = res.data.message;
      if(_self.success){
        _self.success = true;
        _self.message = res.data.message;
        _self.inputError = {
          "firstName":"",
          "lastName":"",
          "email":"",
          "dob":"",
          "mobileNumber":"",
          "college_ID":""
        }
      }else{
        _self.message = "Data not saved";
      }
    });
  };
  preloadData:any = []

  preload(){
    var _self = this;
    this.service.preload(function (res:any,error:any){
      if (error){
        alert(" Preload Error: " + error.message);
        return;
      };
      _self.preloadData = res.preloadList
    })
  }

  reset(){
    this.form = {
      "id":0,
      "firstName":"",
      "lastName":"",
      "email":"",
      "dob":"",
      "mobileNumber":"",
      "college_ID":""
    };
    this.ngOnInit();
    this.inputError = {
      "firstName":"",
      "lastName":"",
      "email":"",
      "dob":"",
      "mobileNumber":"",
      "college_ID":""
    };
    this.message ="";
  }

}
