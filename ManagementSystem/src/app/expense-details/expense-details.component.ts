import { Component , OnInit , Input , Output , EventEmitter} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExpenseService} from "../expense.service";
import {expenseEntry} from "../expenses/expenseEntry";
import {expenseType} from "../expenses/expenseTypes";

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit{
  expenseClaimId :number = 0;
  expenseDetailsList :expenseEntry[] = [];
  expenseDetailEntry:expenseEntry = {id : 0 , date: '' , expenseType : 0 ,expenseClaim : 0,description: '', total: 0};
  expenseTypes: expenseType[]=[];

  ngOnInit() {
    this.getExpeseDetails();
    this.getExpensetypes();
  }
  constructor(private route : ActivatedRoute , private expenseService: ExpenseService) {
  }


  getExpeseDetails(){
    this.expenseClaimId  = Number(this.route.snapshot.paramMap.get('id'));
    this.expenseService.getExpensesEntriesByClaimId( Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        (data) => {this.expenseDetailsList = data;}
    );
  }
  getExpensetypes(){
    this.expenseService.getExpenseTypes().subscribe((data)=>
    {
      this.expenseTypes = data;
    });
  }
  getExpeneTypesbyId(id:number):string{
    let nameOfExpenseType   = this.expenseTypes.find(expense => id===expense.id)?.name;
    if(nameOfExpenseType !==undefined){
      return nameOfExpenseType;
    }
    return "" ;
  }
}
