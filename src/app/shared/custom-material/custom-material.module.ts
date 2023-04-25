import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    MatSidenavModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [
    MatSidenavModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class CustomMaterialModule {
  static forRoot() {
    return {
      ngModule: CustomMaterialModule,
      providers: [],
    };
  }
}
