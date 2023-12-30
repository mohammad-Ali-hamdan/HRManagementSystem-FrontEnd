import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExpenseService} from "../expense.service";
import {expenseEntry} from "../expenses/expenseEntry";
import {expenseType} from "../expenses/expenseTypes";
import {DeleteExpenseDetailsComponent} from "../delete-expense-details/delete-expense-details.component";


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
  @ViewChild('DeleteModal') DeleteModal ! :DeleteExpenseDetailsComponent;
  ngOnInit() {
    this.getExpeseDetails();
    this.getExpensetypes();
  }
  constructor(private route : ActivatedRoute , private expenseService: ExpenseService ) {
  }

  reload(reload:boolean){
    if(reload){
      this.getExpeseDetails();
    }
  }
  OnSelectTrash(id:number):void{

    this.DeleteModal.openModal(id);


  }

  getExpeseDetails(){
    this.expenseClaimId  = Number(this.route.snapshot.paramMap.get('id'));
    this.expenseService.getExpensesEntriesByClaimId( Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        (data) => { this.expenseDetailsList = data;

        }
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
