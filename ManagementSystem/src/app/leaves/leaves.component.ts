import {Component, OnInit, ViewChild} from '@angular/core';
import {Leave} from "./Leave";
import {LeavesService} from "../leaves.service";
import {leavesTypes} from "./LeaveTypes";
import {EmployeeServiceService} from "../employee-service.service";
import {employee} from "../employees/employee";
import {DeleteLeaveComponent} from "../delete-leave/delete-leave.component";
import {AddAndEditLeaveComponent} from "../add-and-edit-leave/add-and-edit-leave.component";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit{
  Leaves:Leave[] =[];
  LeaveTypes: leavesTypes[] =[];
  employees :employee[] =[];
  selectedLeavetype : string ="";
  searchText = "";
  result : Leave[] = [];
  currentPageIndex = 0;
  itemsPerPage: number = 10;
  lengthFilteredLeaves :number =0;
  numberOfPages = 0;

  @ViewChild('DeleteModal')  deletePopUp !: DeleteLeaveComponent;
  @ViewChild('AddEditModal') AddEditPopUp !:AddAndEditLeaveComponent;

  constructor(private leavesService:LeavesService , private employeeService : EmployeeServiceService) {
  }
  ngOnInit() {
    this.getAllLeaves();
    this.getAllLeavesTypes();
    this.getAllEmployess();
    //this.onSearchInputChange();
  }
  getAllLeaves():void{
    this.leavesService.getAllLeaves().subscribe(data =>
    {this.Leaves = data ; this.onSearchInputChange() ;} ,
      (error) => {
        console.error('Error fetching leaves', error);
      }
    )
  }
  getAllLeavesTypes():void{
    this.leavesService.getAllLeavesTypes().subscribe(data =>
      {
        this.LeaveTypes = data
      } ,
      (error) =>{
        console.error('Error fetching leaveTypes', error);
      }
    )
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
  employeeById(id:number):string{
    let nameOfEmployee   = this.employees.find(employee => id===employee.id)?.name;
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
  onSearchInputChange(){


    const lowerCaseSearchText = this.searchText.trim().toLowerCase();
    let FilteredEmployessIds  : number[] = [];
    this.employees.forEach(employee => {
      if(employee.name.toLowerCase().includes(lowerCaseSearchText)){FilteredEmployessIds.push(employee.id)}
    })
    let leaveId = this.LeaveTypes.find(leave => leave.name === this.selectedLeavetype)?.id;
    let leavetypeId = (leaveId !==undefined) ? leaveId : -1;
    let filteredLeaves =  this.Leaves.filter(leave => {
      if(lowerCaseSearchText ===""){
        if(leavetypeId === -1){return true;}
        else{return leave.leavetype === leavetypeId;}
      }
      else {
        if(leavetypeId === -1) {
          return FilteredEmployessIds.includes(leave.employee)
        }
        else {
          return leave.leavetype === leavetypeId && FilteredEmployessIds.includes(leave.employee);
        }
        }
    })
    this.lengthFilteredLeaves = filteredLeaves.length;
    this.numberOfPages =  Math.ceil(this.lengthFilteredLeaves / +this.itemsPerPage) - 1;
    const startIndex = this.currentPageIndex * +this.itemsPerPage;
    const endIndex = Math.min((startIndex + +this.itemsPerPage), filteredLeaves.length);
    this.result =  filteredLeaves.slice(startIndex, endIndex);
    return this.result;
  }


  reload(reload:boolean){
    if(reload){
      this.selectedLeavetype = "";
      this.searchText ="";
      this.itemsPerPage = 10;
      this.currentPageIndex = 0;
      this.onSearchInputChange();
    }
  }
  OnClickEditAdd(functionality:string , leave : Leave):void{
    this.AddEditPopUp.openPopUp(functionality , leave , this.LeaveTypes , this.employees);
  }
  OnSelectTrash(id:number):void{
    this.deletePopUp.openModal(id);
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
    const maxPageIndex = Math.ceil(this.lengthFilteredLeaves / +this.itemsPerPage) - 1;
    if (this.currentPageIndex < maxPageIndex) {
      this.currentPageIndex++;
      this.onSearchInputChange();
    }
  }
  goToLastPage() {
    const maxPageIndex = Math.ceil(this.lengthFilteredLeaves / +this.itemsPerPage) - 1;
    this.currentPageIndex = maxPageIndex;
    this.onSearchInputChange();
  }
  onItemsPerPageChange() {
    this.goToFirstPage();


  }
}
