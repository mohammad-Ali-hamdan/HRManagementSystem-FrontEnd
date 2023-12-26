import { Component , OnInit , Input , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit{
  @Input() expenseClaimId :number = 0;
  ngOnInit() {
  }
  constructor() {
  }



}
