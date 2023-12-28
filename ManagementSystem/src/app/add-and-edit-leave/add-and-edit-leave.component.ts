import { Component , OnInit , Input , Output , EventEmitter } from '@angular/core';
import {Leave} from "../leaves/Leave";
import {leavesTypes} from "../leaves/LeaveTypes";
import {employee} from "../employees/employee";
import {LeavesService} from "../leaves.service";

@Component({
  selector: 'app-add-and-edit-leave',
  templateUrl: './add-and-edit-leave.component.html',
  styleUrls: ['./add-and-edit-leave.component.css']
})
export class AddAndEditLeaveComponent implements OnInit{
   functionality :string = "";
   leave : Leave = {id:0 , leavetype: 0 , from: '' , to : '',numberOfDays:0, note:'' ,employee:0  };
   LeaveTypes : leavesTypes[] = [];
   Employees : employee[] = [];
   selectedLeavetype : string ="";
   selectedEmployee : string ="";
   checkFields = false;
   checkNumberofDays: boolean = true;
   @Output() closeEvent = new EventEmitter<boolean>();
  ngOnInit() {
    this.checkFields= false;
    this.checkNumberofDays = true;
  }
  constructor(private leaveService : LeavesService) {
  }
  employeeById(id:number):string{
    let nameOfEmployee   = this.Employees.find(employee => id===employee.id)?.name;
    if(nameOfEmployee !==undefined){
      return nameOfEmployee;
    }
    return "" ;

  }



  LeaveTypeById(id:number){
    let nameOfLeave   = this.LeaveTypes.find(leave => id===leave.id)?.name;
    if(nameOfLeave !==undefined){
      return nameOfLeave;
    }
    return "" ;


  }

  openPopUp(functionality:string , leave : Leave , leaveTypes:leavesTypes[] , employees : employee[]):void{
    this.leave = leave;
    this.LeaveTypes = leaveTypes;
    this.Employees = employees;
    this.functionality = functionality;
    if(this.functionality === 'ADD'){
      this.selectedEmployee = "";
      this.selectedLeavetype="";
    }
    else if (this.functionality === 'EDIT'){
      this.selectedEmployee = this.employeeById(leave.employee);
      this.selectedLeavetype= this.LeaveTypeById(leave.leavetype);
    }
    this.leave = leave;
    this.LeaveTypes = leaveTypes;
    this.Employees = employees;

    let modal = document.getElementById('AddEditModal');
    if(modal !==null)
    {
      modal.style.display = 'block';
    }
  }

  addOrEditLeave(){
    let empId = this.Employees.find(employee => employee.name === this.selectedEmployee)?.id;
    let leaveId = this.LeaveTypes.find(leave => leave.name === this.selectedLeavetype)?.id;
    this.leave.employee = (empId !==undefined) ? empId : 0;
    this.leave.leavetype = (leaveId !==undefined) ? leaveId : 0;
    if(this.leave.numberOfDays !==0 && this.leave.note !=="" && this.leave.leavetype !== 0  && this.leave.employee !==0
    && this.leave.from !=='' && this.leave.to !== '')
    {
      if(this.functionality === "ADD"){
        this.leaveService.addLeave(this.leave).subscribe(()=>{
          this.closePopUp();
          this.closeEvent.emit(true);
        });
      }
      if(this.functionality === "EDIT"){
        this.leaveService.updateLeave(this.leave).subscribe(()=>
        {
          this.closePopUp();
          this.closeEvent.emit(true);
        })

      }
    }
    else {
      this.checkFields = true;
    }
  }
  closePopUp(){
    this.checkNumberofDays = true;
    this.checkFields = false;
    this.leave = {id:0 , leavetype: 0 , from: '' , to : '',numberOfDays:0, note:'' ,employee:0  };
    let modal = document.getElementById('AddEditModal');
    if(modal !==null)
    {
      modal.style.display = 'none';
    }

  }
  close(){ this.closeEvent.emit(true);}

  calculateDays(): void {
    let startDate =  this.leave.from ;
    let endDate = this.leave.to;
    if (startDate && endDate )  {
      if(startDate <= endDate){
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInMilliseconds = end.getTime() - start.getTime();
        this.leave.numberOfDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        this.checkNumberofDays = true;
      }
      else{this.checkNumberofDays = false; this.leave.numberOfDays=0;}

    }
    else this.leave.numberOfDays=0;

  }

}
