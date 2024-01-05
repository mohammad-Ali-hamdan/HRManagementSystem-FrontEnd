import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {expense} from "../expenses/expense";
import {ExpenseService} from "../expense.service";
import {expenseType} from "../expenses/expenseTypes";
import {expenseEntry} from "../expenses/expenseEntry";
import {EmployeeServiceService} from "../employee-service.service";
import {employee} from "../employees/employee";
import {expenseClaimSubmit} from "../expenses/expenseClaimSubmit";


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit{
  functionality :string = "";
  checkFields= false;
  expenseTypes:expenseType[]=[];
  expensesEntry: expenseEntry[] = [];
  checkBeforeSubmit : boolean = false;
  expenseType: string = '';
  expenseDate: string = '';
  expenseDescription: string = '';
  expenseTotal: string = '';
  selectedEmployee :string='';
  employees :employee[] =[];
  status ="";
  expenseClaimId =0;



  @Output() closeEvent = new EventEmitter<boolean>();
  ngOnInit() {
    this.checkFields= false;
    this.getAllExpenseTypes();
    this.getAllEmployess();
  }
  constructor(private expenseService: ExpenseService , private employeeService : EmployeeServiceService)  {
  }

  openPopUp(functionality: string , expense:expense){
    this.functionality = functionality;
    this.checkFields = false;
    let modal = document.getElementById('AddModal');
    if(modal !==null)
    {
      modal.style.display = 'block';
    }
  }
  closePopUp(){
    this.checkFields = false;
    this.expenseType  = '';
    this.expenseDate = '';
    this.expenseTotal = '';
    this.expenseDescription = '';
    this.expensesEntry = [];
    this.selectedEmployee = '';
    this.status = '';
    this.checkBeforeSubmit = false;

    let modal = document.getElementById('AddModal');
    if(modal !==null)
    {
      modal.style.display = 'none';
    }
  }
  submitExpense(){
      if(this.selectedEmployee && this.status.trim() && this.expensesEntry.length > 0 ){
        this.checkBeforeSubmit = false;
        this.expenseService.submitExpenseEntries(this.expensesEntry).subscribe((data)=>{
          this.expenseClaimId = data;
          this.submitToClaims();
        });

      }
      else {
        this.checkBeforeSubmit = true;
      }

  }



  submitToClaims(){
    let employeeId = this.employees.find(emp => emp.name === this.selectedEmployee)?.id;
    const expenseClaimSubmit : expenseClaimSubmit = {
      expenseClaimId :+this.expenseClaimId ,
      empId : employeeId !== undefined ? employeeId : 0 ,
      description : this.expensesEntry[0].description,
      status : this.status,
      date : this.convertNowDate()

    }
    this.expenseService.submitExpenseClaim(expenseClaimSubmit).subscribe(
        (data)=>{
          this.closePopUp();
          this.closeEvent.emit(true);
        }
    );
  }
  close(){ this.closeEvent.emit(true);}
  addExpenseEntry(){
    //console.log(this.convertNowDate() );
    if ( this.expenseType && this.expenseDate && this.expenseDescription &&  (!isNaN(+this.expenseTotal)) && (+this.expenseTotal>0) ) {//

      let expenseName  =  this.expenseTypes.find(expenseType => expenseType.name === this.expenseType)?.id;
      this.checkFields = false;
      const expense: expenseEntry = {
        id : 0 ,
        date: this.convertDateFormat(this.expenseDate) ,
        expenseType : expenseName !==undefined ? expenseName : 0 ,
        expenseClaim : 0,
        description: this.expenseDescription,
        total: +this.expenseTotal
      };


       this.expensesEntry.push(expense);

      // // Clear input fields
      this.expenseType = '';
      this.expenseDate = '';
      this.expenseDescription = '';
      this.expenseTotal = '0';
    } else {
      this.checkFields = true;
    }

  }

  getAllExpenseTypes():void{
    this.expenseService.getExpenseTypes().subscribe(
      (data) =>{
        this.expenseTypes = data;
      }
    );
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
  convertDateFormat(date: string): string {
    if (date) {
      const parts = date.split('-');
      if (parts.length === 3) {
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        return formattedDate;
      } else {
        console.error('Invalid date format:', date);
      }
    }

    return date;
  }
  convertNowDate(): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let date =  new Date().toLocaleDateString('en-US', options).toString();
    if (date) {
      const parts = date.split('/');
      if (parts.length === 3) {
        const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
        return formattedDate;
      } else {
        console.error('Invalid date format:', date);
      }
    }

    return date;
  }

  OnSelectTrash(expenseToDelete:any){
    this.expensesEntry = this.expensesEntry.filter(expense => expense !== expenseToDelete);

  }

}
