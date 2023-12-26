import { Component , OnInit , Input  } from '@angular/core';

@Component({
  selector: 'app-content-componant',
  templateUrl: './content-componant.component.html',
  styleUrls: ['./content-componant.component.css']
})
export class ContentComponantComponent {
  @Input() itemSelected :string= "";



}
