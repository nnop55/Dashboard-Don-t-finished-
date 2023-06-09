import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(public dialog: MatDialog) { }

  openDialog<T, D = any>(component: ComponentType<T>, data?: D): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      data,
      width: '500px'
    });

    return dialogRef.afterClosed();
  }

}
