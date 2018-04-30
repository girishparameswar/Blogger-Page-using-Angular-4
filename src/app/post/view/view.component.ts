import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  display: any = 'none';
  @Input() user: any = []
  result = [];
  
  constructor() {

   }

  ngOnInit() {
    this.result.push(this.user);
    console.log(this.result);
  }

  openModal() {
    this.display = 'block';
  }
  
  onCloseHandled() {
    this.display='none';
  }
  

}
