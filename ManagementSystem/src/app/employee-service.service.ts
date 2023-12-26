import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import {Observable , of} from "rxjs";
import{employee} from "./employees/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http :HttpClient  ) { }
   httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
     responseType: 'text'as 'json' ,

   }
  private EmployeeApi = "http://localhost:8081/apiEmployee";
  private DepartmentApi ="http://localhost:8081/apiDepartment";

  getAllEmployees():Observable<any>{
    return this.http.get<any>(`${this.EmployeeApi}/getall`);
  }

  getAllDepartment():Observable<any>{
    return this.http.get<any>(`${this.DepartmentApi}/getall`);
  }
  createEmployee(emp : employee): Observable<any>{
      //http://localhost:8081/apiEmployee/createEmp
     return this.http.post<any>(`${this.EmployeeApi}/createEmp`, emp , this.httpOptions);

  }

  deleteEmployee(id:number):Observable<any>{
    return this.http.delete(`${this.EmployeeApi}/deleteEmp/${id}` ,this.httpOptions); //.pipe(response =>  JSON.parse(response) );
  }

  updateEmployee(employee : employee):Observable<any>{
    //console.log(employee);
    return this.http.patch(`${this.EmployeeApi}/updateEmp`,employee ,this.httpOptions);
  }

  getEmployeeById(id:number):Observable<any>{
    return this.http.get<any>(`${this.EmployeeApi}/getbyid/${id}`);
  }


}
