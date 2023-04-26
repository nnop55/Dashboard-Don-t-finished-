import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopUpService } from './pop-up.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  infoData: any;
  disableEnableInps: boolean = false;
  disableBtn: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: PopUpService,
    private dialogRef: MatDialogRef<PopUpComponent>
  ) {
    this.infoData = data;
  }

  ngOnInit(): void {
    console.log(this.data)

  }

  disableInputs(index: number): boolean {
    if (this.disableEnableInps === false) return true;
    return index === 0 ? true : false;
  }

  actionButtons(checkButton: string) {
    switch (checkButton) {
      case 'save':
        this.disableEnableInps = false;
        this.dialogRef.close(this.infoData.data);
        break;
      case 'add':
        this.dialogRef.close(this.infoData.data);
        break;
      case 'delete':
        this.dialogRef.close(this.infoData.data);
        break;
    }
  }

  validation(item: any) {
    if (item != '') {
      this.disableBtn = false;
    } else {
      this.disableBtn = true
    }
  }

}
