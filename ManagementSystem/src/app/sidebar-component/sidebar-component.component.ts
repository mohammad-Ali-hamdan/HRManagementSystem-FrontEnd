import { Component , OnInit} from '@angular/core';
import {listOfitems} from "./items";

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.css']
})
export class SidebarComponentComponent implements OnInit{
  isToggled : boolean = true;
  items: string[] =[];
  itemSelected :string= "Employees";

  ngOnInit():void{
    this.items = listOfitems;

  }

  OnSelect(item:string):void{
    this.itemSelected = item;
  }


  Toggle():void{
    this.isToggled = !this.isToggled;

  }
}
