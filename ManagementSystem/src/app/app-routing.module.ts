import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import {SidebarComponentComponent} from "./sidebar-component/sidebar-component.component";
import {ExpenseDetailsComponent} from "./expense-details/expense-details.component";
import {LeavesComponent} from "./leaves/leaves.component";
import {ExpensesComponent} from "./expenses/expenses.component";

const routes: Routes = [
    //{path:'employees' , component: EmployeesComponent},
  //{path:'sidebar' , component:SidebarComponentComponent} ,
  //{path : '' , redirectTo:'/sidebar' , pathMatch:'full'} ,
  { path: 'employees', component: EmployeesComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'expenses', component: ExpensesComponent },
  {path: 'details/:id' , component: ExpenseDetailsComponent},
  {path : '' , redirectTo:'/employees' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
