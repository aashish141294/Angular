import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  msg = "";
  rolename:any ;
  firstname:any ;

  constructor(private router:Router, private location:Location, private arout:ActivatedRoute) { }

  ngOnInit(){
    this.isSessionout();
    this.isLogout();
  }

  isSessionout(){
    let loginId = localStorage.getItem("loginId")
    console.log("isSessionout method loginId = ",loginId)
    if((loginId == "null" || loginId == null)&&(this.location.path() != "")&& this.location.path() != "/login" && this.location.path() != "/registration" && this.location.path() != "/sessionout" && this.location.path() != "/logout" && this.location.path() != "/forgetpassword"){
    
    localStorage.clear();
    console.log("session out path --->",this.location.path())
    this.msg = "OOPS! Your session has been expired";
    localStorage.setItem("sess_msg",this.msg);
    this.router.navigateByUrl("/sessionOut");
    return true;
    }else{
      return false;
    }
  }

  isLogin(){
    console.log("Menu-- islogin()---->")
    let check = localStorage.getItem("loginId");
    if (check != "null" && check != null){
      this.rolename = localStorage.getItem("roleName");
      this.firstname = localStorage.getItem("firstName");

    }
    if (check != "null" && check != null){
      return true;
    }else{
      return false;
    }
  }

  isLogout(){
    console.log("Menu-- Logout---->")
    if (this.location.path() == "/logout"){
      localStorage.clear();
      localStorage.setItem("loginId","null");
      localStorage.setItem("logout_msg","Logout Successfully");
      this.router.navigateByUrl("/login");
    }
  }

}
