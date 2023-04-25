import { Component, Input, OnInit, OnChanges, EventEmitter, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from './table.service';
import { ActivatedRoute, } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Output() pageChanged = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() sortBy = new EventEmitter<{ active: string, direction: string }>();
  @Output() currentIdEmitter = new EventEmitter<{ emitId: number }>();

  @Input() data!: any[];
  @Input() displayedColumns!: { columnDef: string, header: string, isSortable: boolean }[];
  @Input() totalItems!: number;
  @Input() searchData!: any;

  columnDefs!: string[];

  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.columnDefs = this.displayedColumns.map(column => column.columnDef);
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.test = filterValue;
  // }

  onPageChangedEmit(event: any) {
    const { pageIndex, pageSize } = event;
    this.pageChanged.emit({ pageIndex, pageSize });
  }

  onSortEmit(event: any) {
    const { active, direction } = event;
    this.sortBy.emit({ active, direction })
  }

  currentIdEmit(id: number) {
    const emitId: number = id;
    this.currentIdEmitter.emit({ emitId });
  }

  popUp(id: number) {
    this.currentIdEmit(id);
  }


}



