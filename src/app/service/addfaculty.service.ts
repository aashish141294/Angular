import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** 
 * Provides REST CRUD operations of Faculty Functionality
 * Each method of this class recieves response callback method
 * Response callback method is called by observable and passed data error
 */

@Injectable({
  providedIn: 'root'
})
export class AddfacultyService {

  //Rest Endpoint
  endpoint = "http://localhost:8000/ORSAPI/Faculty/"

  /** Constructor Injects Http service
   * @param http
   */

  constructor(private http:HttpClient) { }

  /**
   * Gets Faculty
   * @param id
   * @param response 
   */

  get(id:number, compCB:any){
    let url = this.endpoint + "get/" + id
    var observable = this.http.get(url)
    observable.subscribe(
      function success(data) {
        compCB(data);
      }, function fail(data) {
        compCB(data,true);
      }
    );
  }

  /**Deletes a faculty
   * @param id
   * @param response
   */

  delete(id:number, compCB:any){
    let url = this.endpoint + "delete/" +id;
    this.http.get(url).subscribe(
      (data) => {
        compCB(data);
      },(data) => {
        compCB(data,true);
      }
    );
  }

  /**Preload data */
  preload(compCB:any){
    let url = this.endpoint + "preload";
    var observable = this.http.get(url);
    observable.subscribe(
      function success(data){
        console.log("Preload data",data);
        compCB(data);
      }, function fail(data){
        compCB(data,true);
      }
    );
  }
  /**Search faculty
   * @param form
   * @param response
   */

  search(form:any,compCB:any){
    let url = this.endpoint + "search"
    this.http.post(url,form).subscribe(
      (data) => {
        compCB(data);
      },(data) => {
        compCB(data,true)
      }
    );
  }
   /** Add/Update Faculty
   * @param form
   * @param response
   */

   save(form:any,compCB:any){
    let url = this.endpoint + "save";
    this.http.post(url,form).subscribe(
      (data) => {
        compCB(data);
      },(data) => {
        compCB(data,true);
      }
    );
   }

}
