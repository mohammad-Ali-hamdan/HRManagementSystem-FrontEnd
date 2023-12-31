import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExpenseService} from "../expense.service";

@Component({
  selector: 'app-delete-expense-details',
  templateUrl: './delete-expense-details.component.html',
  styleUrls: ['./delete-expense-details.component.css']
})
export class DeleteExpenseDetailsComponent implements OnInit{
  deleteExpenseDetails: number = 0;
  @Output() deleteEvent = new EventEmitter<boolean>();
  deleteFailure:boolean = false;
  ngOnInit() {
  }
  constructor(private expenseService: ExpenseService) {
  }

  closeDeletePopUp(): void {
    this.deleteFailure = false;
    const DeleteModal = document.getElementById('DeleteModal');
    if (DeleteModal != null) {
      DeleteModal.style.display = 'none';
    }

  }

  deleteExpenseDetailsAndUpdateClaim(): void {
    this.expenseService.deleteExpenseDetailsAndUpdateClaim(this.deleteExpenseDetails).subscribe(
      () => {
        this.deleteFailure = false;
        this.closeDeletePopUp();
        this.deleteEvent.emit(true);
      },
      (error)=>{
        if (error.status === 404) {
          this.deleteFailure = true;
          //alert("Failed to delete . Invalid Information");
        }
      }
    );

  }
  // reload(){
  //   alert("reload");
  //   this.deleteEvent.emit(true);
  // }

  openModal(id: number) {
    this.deleteExpenseDetails = id;
    const DeleteModal = document.getElementById('DeleteModal');
    if (DeleteModal != null) {
      DeleteModal.style.display = 'block';
    }
  }
}
