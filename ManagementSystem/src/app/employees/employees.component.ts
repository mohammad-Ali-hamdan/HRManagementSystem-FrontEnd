import { Component , OnInit , OnChanges, ViewChild} from '@angular/core';
import {EmployeeServiceService} from "../employee-service.service";
import {employee} from "./employee";
import {AddEmployeeModalComponent} from "../add-employee-modal/add-employee-modal.component";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {Department} from "../add-employee-modal/Department";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{
  employees: employee[] = [];
  searchText: string = '';
  result : employee [] = [];
  currentPageIndex = 0;
  numberOfPages=0;
  itemsPerPage: number = 5;
  lengthFilteredEmployees :number =0;
  nameOfDepartments : string[]=[];
  Departments :Department[]=[];
  @ViewChild('AddModal') AddModal! :AddEmployeeModalComponent;
  @ViewChild('DeleteModal') DeleteModal ! :DeleteEmployeeComponent;
  constructor(private employeeService : EmployeeServiceService) {
  }
  ngOnInit():void{
    this.getAllEmployess();
    this.getDepartments();

  }

  departmentById(id:number):string{
    let DepartmentName  = this.Departments.find(item=>item.id === id)?.name;
    if(DepartmentName !==undefined){
      return DepartmentName;
    }
    else return "";
  }

  getDepartments():void{
    this.employeeService.getAllDepartment().subscribe(data =>
      {

        this.Departments = data;

      },
      (error) => {
        console.error('Error fetching employees', error);
      }

    );


  }

  getAllEmployess():void{
    this.employeeService.getAllEmployees().subscribe(data =>
      {

        this.employees = data;
        this.filterEmployees();
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
  OnClickAddEdit(functionality:string , employee : employee):void{
    this.AddModal.openAddPopUp(functionality ,employee);

  }


  OnSelectTrash(id:number):void{

    this.DeleteModal.openModal(id);


  }


  reload(reload:boolean){
    if(reload){
      this.searchText ="";
      this.itemsPerPage = 5;
      this.currentPageIndex = 0;
      this.getAllEmployess();


    }
  }

  filterEmployees():employee[]{
    const lowerCaseSearchText = this.searchText.toLowerCase();
    let filter = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(lowerCaseSearchText)
    );
    this.lengthFilteredEmployees = filter.length;
    this.numberOfPages =  Math.ceil(this.lengthFilteredEmployees / +this.itemsPerPage) - 1;
    const startIndex = this.currentPageIndex * +this.itemsPerPage;
    const endIndex = Math.min((startIndex + +this.itemsPerPage), filter.length);
    this.result =  filter.slice(startIndex, endIndex);
    return this.result;


  }

  onSearchInputChange():void{this.filterEmployees();}

  goToFirstPage(){
    this.currentPageIndex = 0;
    this.onSearchInputChange();
  }
  goToPreviousPage(){
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.onSearchInputChange();

    }
  }
  goToNextPage(){
    const maxPageIndex = Math.ceil(this.lengthFilteredEmployees / +this.itemsPerPage) - 1;
    if (this.currentPageIndex < maxPageIndex) {
      this.currentPageIndex++;
      this.onSearchInputChange();
    }
  }
  goToLastPage(){
    const maxPageIndex = Math.ceil(this.lengthFilteredEmployees / +this.itemsPerPage) - 1;
    this.currentPageIndex = maxPageIndex;
    this.onSearchInputChange();
  }
  onItemsPerPageChange() {
    this.goToFirstPage();


  }
}
