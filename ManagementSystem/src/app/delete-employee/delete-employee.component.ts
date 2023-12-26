import { Component , OnInit ,Input , OnChanges ,Output , EventEmitter} from '@angular/core';
import {employee} from "../employees/employee";
import {EmployeeServiceService} from "../employee-service.service";



@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit{
  deleteEmployee: number = 0;
  @Output() deleteEvent = new EventEmitter<boolean>();

  ngOnInit(){

  }
  constructor(private employeeService: EmployeeServiceService) {
  }

  closeDeletePopUp(): void {
    const DeleteModal = document.getElementById('DeleteModal');
    if (DeleteModal != null) {
      DeleteModal.style.display = 'none';
    }

  }

  deleteEmp(): void {
    this.employeeService.deleteEmployee(this.deleteEmployee).subscribe(
      () => {
        this.closeDeletePopUp();
        this.deleteEvent.emit(true);
      }
    );

  }
  reload(){
    alert("reload");
    this.deleteEvent.emit(true);
  }

  openModal(id: number) {
    this.deleteEmployee = id;
    const DeleteModal = document.getElementById('DeleteModal');
    if (DeleteModal != null) {
      DeleteModal.style.display = 'block';
    }
  }


}
