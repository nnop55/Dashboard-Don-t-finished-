import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-drawer-container class="example-container" autosize>
  <mat-drawer #drawer class="example-sidenav" mode="side">
      <p>Auto-resizing sidenav</p>
  </mat-drawer>
  <div class="menu">
      <button type="button" mat-button (click)="drawer.toggle()">
          <mat-icon> drag_handle</mat-icon>
      </button>
  </div>
  <div class="example-sidenav-content">
    <router-outlet></router-outlet>
  </div>
</mat-drawer-container>
`,
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
