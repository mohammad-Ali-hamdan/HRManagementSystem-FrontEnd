import { Component ,Input , Output ,EventEmitter , OnInit } from '@angular/core';
import {LeavesService} from "../leaves.service";

@Component({
  selector: 'app-delete-leave',
  templateUrl: './delete-leave.component.html',
  styleUrls: ['./delete-leave.component.css']
})
export class DeleteLeaveComponent implements OnInit{
    @Output() deleteEvent = new EventEmitter<boolean>();
    deletedLeave :number = 0;

  constructor(private leaveService : LeavesService) {
  }
  ngOnInit() {
  }

  deleteLeave(){
    if(this.deletedLeave > 0)
    {
      this.leaveService.deleteLeave(this.deletedLeave).subscribe(()=>
        {
          this.closeDeletePopUp();
          this.deleteEvent.emit(true);
        },
        (error) =>{
          if (error.status === 404){
            alert("Cannot delete this leave. Invalid Information .");
          }
        }
      );
    }

  }
  closeDeletePopUp(){
    const displayedModal = document.getElementById('DeleteModal');
    if(displayedModal != null){
      displayedModal.style.display = 'none';
    }
  }
  openModal(id:number){
    this.deletedLeave =id;
    const displayedModal = document.getElementById('DeleteModal');
    if(displayedModal != null){
      displayedModal.style.display = 'block';
    }
  }



}
