import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { identifierName } from '@angular/compiler';
/**
 * Provides REST CRUD operations of student functionality
 * Each method of this class receives response-callback method.
 * Response callback method is called by Observable and passed data and error.
 *
 */

@Injectable({
  providedIn: 'root'
})
export class StudentService {
//Rest endpoint'
endpoint = "http://localhost:8000/ORSAPI/Student/"

/**
* Constructor injects HTTP service
*
* @param http
*/
  constructor(private http:HttpClient) { }

/**
 * Gets Student
 *
 * @param id
 * @param response
 */
 get(id:number,compCB:any){
  let url = this.endpoint + "get/" + id;
  var observable = this.http.get(url);
  observable.subscribe(
    function success(data){
      compCB(data);
    }, function fail(data){
      compCB(data,true);
    }
  );
 }

 preload(compCB:any){
  let url = this.endpoint + "preload";
  var observable = this.http.get(url);
  observable.subscribe(
    function success(data){
      compCB(data);
    }, function fail(data){
      compCB(data,true);
    }
  );
 }
 /**
   * Delets a Student
   *
   * @param id
   * @param response
   */

 delete(id:any,compCB:any){
  let url = this.endpoint + "delete/" + id;
  var observable = this.http.get(url);
  observable.subscribe(
    (data) => {
      compCB(data);
    },(data) => {
      compCB(data,true);
    });
 }
 
  /**
   * Searches Student
   *
   * @param response
   */
  search(form:any,compCB:any){
    let url = this.endpoint + "search";
    var observable = this.http.post(url,form);
    observable.subscribe(
      (data) => {
        compCB(data);
      },(data) => {
        compCB(data,true);
      }
    );
  }
  /**
   * Add/Update Student
   * @param form Adds or updates a record
   * @param response
   */
  save(form:any,compCB:any){
    let url = this.endpoint + "save"
    this.http.post(url,form).subscribe(
      (data) => {
        compCB(data);
      },(data) => {
        compCB(data,true);
      }
    );
  }
}
