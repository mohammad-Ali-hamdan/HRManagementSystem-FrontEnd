import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { ContentComponantComponent } from './content-componant/content-componant.component';
import { SidebarComponentComponent } from './sidebar-component/sidebar-component.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';
import { LeavesComponent } from './leaves/leaves.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DeleteLeaveComponent } from './delete-leave/delete-leave.component';
import { AddAndEditLeaveComponent } from './add-and-edit-leave/add-and-edit-leave.component';
import {DatePipe} from "@angular/common";
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ContentComponantComponent,
    SidebarComponentComponent,
    AddEmployeeModalComponent,
    LeavesComponent,
    DeleteEmployeeComponent,
    EditEmployeeComponent,
    DeleteLeaveComponent,
    AddAndEditLeaveComponent,
    ExpensesComponent,
    ExpenseDetailsComponent,
    AddExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DatePipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
