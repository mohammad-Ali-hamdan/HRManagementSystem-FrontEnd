import { Component , OnInit} from '@angular/core';
import {expense} from "./expense";
import {ExpenseService} from "../expense.service";
import {pageable} from "./pageable";
import {Observable} from "rxjs";
import {employee} from "../employees/employee";
import {EmployeeServiceService} from "../employee-service.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit{
    searchText ="";
    itemsPerPage:number=10;
    currentPageIndex:number =0;
    numberOfPages:number =0;
    expenseNull :expense = {id : 0 , date : "" , description : "", total : 0 , status : "",  employeeId : 0 }
    result:expense[] =[];
    expenses:expense[] =[];
    pageable : pageable = {pageSize : 10 , pageNumber : 0 , employee : []};
    employeeName!: Observable<any>;
    employees : employee[] =[];
    lengthFilteredExpense =0;

    constructor(private expenseService:ExpenseService , public employeeService : EmployeeServiceService) {
    }
    ngOnInit() {
      this.getAllEmployess();
      this.getAllExpenses();
    }
    getAllEmployess():void{
        this.employeeService.getAllEmployees().subscribe(data =>
            {
                this.employees = data;
            },
            (error) => {
                console.error('Error fetching employees', error);
            }
        );
    }

    getAllExpenses(){
    this.expenseService.getAllExpenses().subscribe(
        (data)=>{
          this.expenses = data;
          this.onSearchInputChange();
        }
      );
    }
    getPageableExpensesWithoutFilter(){
     this.expenseService.getPageableExpensesWithoutFilter({pageSize : 10 , pageNumber : 0 , employee : []}).subscribe(
        (data) =>{
          this.result = data;

         },
        (error) =>{
          console.error('Error fetching leaveTypes', error);
       }
     );
   }

    employeeById(id:number):string{
        let nameOfEmployee   = this.employees.find(employee => id===employee.id)?.name;
        if(nameOfEmployee !==undefined){
            return nameOfEmployee;
        }
        return "" ;
    }



    onSearchInputChange(){
        const lowerCaseSearchText = this.searchText.trim().toLowerCase();
        let FilteredEmployessIds  : number[] = [];
        this.employees.forEach(employee => {
            if(employee.name.toLowerCase().includes(lowerCaseSearchText)){FilteredEmployessIds.push(employee.id)}
        })
        let filteredexpense =  this.expenses.filter(expense => {
            if(lowerCaseSearchText ===""){return true;}
            else {return FilteredEmployessIds.includes(expense.employeeId)}

        })
        this.lengthFilteredExpense = filteredexpense.length;
        this.numberOfPages =  Math.ceil(this.lengthFilteredExpense / +this.itemsPerPage) - 1;
        const startIndex = this.currentPageIndex * +this.itemsPerPage;
        const endIndex = Math.min((startIndex + +this.itemsPerPage), filteredexpense.length);
        this.result =  filteredexpense.slice(startIndex, endIndex);
        //return this.result;
    }
    goToFirstPage() {
        this.currentPageIndex = 0;
        this.onSearchInputChange();
    }
    goToPreviousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this.onSearchInputChange();

        }
    }

    goToNextPage() {
        const maxPageIndex = Math.ceil(this.lengthFilteredExpense / +this.itemsPerPage) - 1;
        if (this.currentPageIndex < maxPageIndex) {
            this.currentPageIndex++;
            this.onSearchInputChange();
        }
    }
    goToLastPage() {
        const maxPageIndex = Math.ceil(this.lengthFilteredExpense / +this.itemsPerPage) - 1;
        this.currentPageIndex = maxPageIndex;
        this.onSearchInputChange();
    }
    onItemsPerPageChange() {
        this.goToFirstPage();


    }
    OnClickAddEdit(functionality:string  , expense:expense){
   //this.getEmpById(1);

    }
    OnSelectTrash(id:number){}
    reload(reload:boolean){
      if(reload){
        this.searchText ="";
        this.itemsPerPage = 10;
        this.currentPageIndex = 0;
        this.onSearchInputChange();
    }}


}
