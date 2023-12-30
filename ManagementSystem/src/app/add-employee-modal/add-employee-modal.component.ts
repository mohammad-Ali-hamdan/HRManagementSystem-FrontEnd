import {Component, EventEmitter, Input, Output , OnInit , OnDestroy} from '@angular/core';
import {employee} from "../employees/employee";
import {EmployeeServiceService} from "../employee-service.service";
import {Department} from "./Department";


@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css']
})
export class AddEmployeeModalComponent implements OnInit {
  Departments :Department[]=[];
  nameOfDepartments : string[]=[];
  newEmployee : employee = {id : 100 , name:'' , address:'' , email:'' , departmentId: -1};
  DepartmentSelected :string = '';
  functionality:string ='';
  checkFields = false;
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor(private employeeService:EmployeeServiceService) {
  }
  ngOnInit() {
    this.getDepartments();
    this.checkFields= false;


  }



  openAddPopUp(functionality:string , employee :employee){
    this.checkFields = false;
    this.functionality = functionality;
    this.newEmployee =  employee;
    if(functionality ==='ADD'){
      this.DepartmentSelected = '';
      const  modelDiv = document.getElementById('AddModal');
      if(modelDiv !=null){
        modelDiv.style.display = 'block';
      }
    }else if(functionality ==='EDIT'){
      let DepartmentName  = this.Departments.find(item=>item.id === this.newEmployee.departmentId)?.name;
      if(DepartmentName !==undefined){this.DepartmentSelected= DepartmentName ;}
      const  modelDiv = document.getElementById('AddModal');
      if(modelDiv !=null){
        modelDiv.style.display = 'block';
      }
    }


  }

  closeAddPopUp(){
    this.newEmployee = {id : 100 , name:'' , address:'' , email:'' , departmentId: -1};
    const  modelDiv = document.getElementById('AddModal');
    if(modelDiv != null){
      modelDiv.style.display = 'none';

    }


  }
  close(){ this.closeEvent.emit(true);}

  addOREditEmployee():void{

    let depId= this.Departments.find(item => item.name === this.DepartmentSelected)?.id;

    if(depId !== undefined && depId > 0  && (!/\d/.test(this.newEmployee.name))
    && (this.newEmployee.email.search('@') !== -1) )
    {
      this.newEmployee.departmentId =depId;
      if(this.functionality === 'ADD'){
        this.employeeService.createEmployee(this.newEmployee ).subscribe(() =>{
          this.closeAddPopUp();
          this.closeEvent.emit(true);
        },
          (error) =>{
            if (error.status === 404){
              alert("Cannot Add this employee. Invalid Information .");
            }
          }

        );
      }
      else if(this.functionality ==='EDIT')
      {

       this.employeeService.updateEmployee(this.newEmployee).subscribe(() =>{
         this.closeAddPopUp();
         this.closeEvent.emit(true);
       },
         (error) =>{
           if (error.status === 404){
             alert("Cannot update this employee. Invalid Information .");
           }
         }

       );
      }

    }
    else{
      this.checkFields = true;
      // alert("Name must not include numbers , Email must be valid example: angular@gmail.com" +
      //   "and Department must be filled");
    }





  }
  getDepartments():void{
    this.employeeService.getAllDepartment().subscribe(data =>
        {

          this.Departments = data;
          this.storeDep();
        },
        (error) => {
          console.error('Error fetching employees', error);
        }

    );


  }



  storeDep():void{

    this.Departments.forEach(data => this.nameOfDepartments.push(data.name));
    //console.log();
    //alert(this.Departments.length);
  }
}
