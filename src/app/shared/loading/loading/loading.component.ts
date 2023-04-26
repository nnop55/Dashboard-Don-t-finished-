import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div class="spinner">
    <mat-spinner></mat-spinner>
  </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
