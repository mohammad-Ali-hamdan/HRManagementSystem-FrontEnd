import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import {Observable , of} from "rxjs";
import {Leave} from "./leaves/Leave";
import {pageableComponent} from "./pageable-leave/pageableComponent";

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(private http :HttpClient) { }
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'as 'json' ,

    }
  private LeavesAPI = "http://localhost:8081/apileavedetails";
  private LeavesTypesAPI ="http://localhost:8081/apileaveType";

  getAllLeaves():Observable<any>{
    return this.http.get<any>(`${this.LeavesAPI}/getall`);
  }

  getAllLeavesTypes():Observable<any>{
    return this.http.get<any>(`${this.LeavesTypesAPI}/getall`); //http://localhost:8081/apileaveType/getall
  }

  deleteLeave(id:number): Observable<any>{
    return this.http.delete(`${this.LeavesAPI}/deletebyId/${id}` , this.httpOptions);
  }

  addLeave(leave:Leave): Observable<any>{
    return this.http.post(`${this.LeavesAPI}/SubmitLeave` , leave ,this.httpOptions);
  }

  updateLeave(leave:Leave): Observable<any>{
    return this.http.patch(`${this.LeavesAPI}/updateLeavedetails` , leave , this.httpOptions);
  }


  paginationLeaves():Observable<any>{
    let object ={
      "pageSize": 10,
      "pageNumber": 0,
      "employee": 0,
      "leave":0}

    return this.http.put<any>('http://localhost:8081/apileavedetails/listpagination' , object , this.httpOptions);
  }

  pageacleComponent(object : pageableComponent):Observable<any>{

    return this.http.put<any>('http://localhost:8081/apileavedetails/pageableComponent' , object , this.httpOptions);
  }


}


