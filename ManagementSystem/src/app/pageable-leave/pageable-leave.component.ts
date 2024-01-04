import { Component , OnInit } from '@angular/core';
import {LeavesService} from "../leaves.service";
import {EmployeeServiceService} from "../employee-service.service";
import {Leave} from "../leaves/Leave";
import {leavesTypes} from "../leaves/LeaveTypes";
import {employee} from "../employees/employee";
import {pageableComponent} from "./pageableComponent";

@Component({
  selector: 'app-pageable-leave',
  templateUrl: './pageable-leave.component.html',
  styleUrls: ['./pageable-leave.component.css']
})
export class PageableLeaveComponent implements OnInit{
  pageableObject : pageableComponent = {
    pageSize: 5,
    pageNumber: 0,
    text: ""
  };
  Leaves:Leave[] =[];
  LeaveTypes: leavesTypes[] =[];
  employees :employee[] =[];
  searchText = "";
  result : Leave[] = [];
  currentPageIndex = 0; // first page
  itemsPerPage: number = 5;
  maxPageIndex :number = 1;

  ngOnInit() {
    this.pageableComponent(this.pageableObject);
    this.getAllLeavesTypes();
    this.getAllEmployess();
  }
  constructor(private leavesService:LeavesService , private employeeService : EmployeeServiceService) {
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

  pageableComponent(pageableComponnet: pageableComponent){
    this.leavesService.pageacleComponent(pageableComponnet).subscribe(data => {
      this.result = JSON.parse(data);
      if(this.result.length < +this.itemsPerPage){
        this.maxPageIndex = this.currentPageIndex;
      }
      else{
        this.maxPageIndex = this.currentPageIndex + 1;
      }
    });

  }
  onSearchInputChange(){
    const lowerCaseSearchText = this.searchText.trim().toLowerCase();
    let pageableObject: pageableComponent = {
      pageSize: +this.itemsPerPage ,
      pageNumber: this.currentPageIndex,
      text: lowerCaseSearchText
    };
    this.pageableComponent(pageableObject);



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

    if (this.currentPageIndex < this.maxPageIndex) {
      this.currentPageIndex++;
      this.onSearchInputChange();
    }

  }

  onItemsPerPageChange() {
    this.goToFirstPage();


  }


}
