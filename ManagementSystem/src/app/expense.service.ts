import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders , HttpParams} from "@angular/common/http";
import {Observable , of} from "rxjs";
import {expense} from "./expenses/expense";
import {pageable} from "./expenses/pageable";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http :HttpClient) { }
  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), responseType: 'text'as 'json' ,

  }

  private expenseAPI = "http://localhost:8081/apiExpenseClaim";

  getPageableExpensesWithFilter(pageable : pageable):Observable<any>{
    return this.http.put<any>(`${this.expenseAPI}/paginationFilter` , pageable , this.httpOptions);
  }

  getPageableExpensesWithoutFilter(pageable : pageable):Observable<any>{
    return this.http.put<any>(`${this.expenseAPI}/paginationWithoutFilter` ,  pageable , this.httpOptions).pipe(
      map((data: string) => {
        try {
          const parsedData = JSON.parse(data);
          return Array.isArray(parsedData) ? parsedData as expense[] : [];
        } catch (error) {
          console.error('Error parsing JSON', error);
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching expenses', error);
        return [];
      })
    );
  }

  getAllExpenses():Observable<any>{
    return this.http.get<any>(`${this.expenseAPI}/getall`);
  }

}
