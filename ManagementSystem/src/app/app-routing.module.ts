import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import {SidebarComponentComponent} from "./sidebar-component/sidebar-component.component";
import {ExpenseDetailsComponent} from "./expense-details/expense-details.component";

const routes: Routes = [ {path:'employees' , component: EmployeesComponent},
  {path:'sidebar' , component:SidebarComponentComponent} ,
  {path : '' , redirectTo:'/sidebar' , pathMatch:'full'} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
