import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpService } from './pop-up.service';
import { User } from 'src/app/components/users/models/user.model';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  dataKeys!: any[];
  infoData: any;
  disableEnableInps: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: PopUpService
  ) {
    this.infoData = data.data;
    this.dataKeys = Object.keys(this.infoData)
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  disableInputs(index: number): boolean {
    let disableId = index === 0 ? true : false;
    if (this.disableEnableInps === false) {
      return true
    }
    return disableId
  }


}
