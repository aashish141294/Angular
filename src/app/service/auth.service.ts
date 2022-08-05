import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Provides REST CRUD operations of User functionality
 * Each method of this class receives response callback method
 * Response callback method is called by Observable and passed data and error
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Rest endpoint
  endpoint = "http://localhost:8000/ORSAPI/Login/";
  locator:any;
  form:any;

/**   Constructor injects Http service
 * 
 * @param http
 */
  constructor(private http: HttpClient) { }

/**
 * 
 * @param form 
 * @param compCB 
 */
  auth(form: any, compCB: any) {
    console.log("authService auth()--->")
    let url = this.endpoint + "auth";
    this.http.post(url,form).subscribe(
      (data) => {
        compCB(data);
      },
      (data) => {
        compCB(data, true);
      });
  }

  logout(form:any, compCB:any) {

    let url = this.endpoint + "logout";
    this.http.post(url,form).subscribe(
      (data) => {
        compCB(data);
      },
      (data) => {
        compCB(data,true);
      });
  }

}
