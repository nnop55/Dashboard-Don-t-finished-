import { Component, Input, OnInit, AfterViewInit, OnChanges, EventEmitter, Output, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading/service/loading.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInputRef!: ElementRef;

  @Output() pageChanged = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  @Output() sortByEmit = new EventEmitter<{ active: string, direction: string }>();
  @Output() currentIdAndModeEmitter = new EventEmitter<{ emitId: number, emitMode: string }>();
  @Output() filterValue = new EventEmitter<string>();

  @Input() data!: any[];
  @Input() displayedColumns!: { columnDef: string, header: string, isSortable: boolean }[];
  @Input() totalItems!: number;
  @Input() buttonText!: string;
  @Input() loadingStatus!: boolean;
  @Input() tableParams!: any;

  columnDefs!: string[];

  dataSource!: MatTableDataSource<any>;

  constructor(private loader: LoadingService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.columnDefs = this.displayedColumns.map(column => column.columnDef);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const searchInput = this.searchInputRef.nativeElement;

      fromEvent(searchInput, 'keyup').pipe(
        debounceTime(200)
      ).subscribe((event: any) => {
        this.onFilterEmit(this.tableParams.searchTerm)
      });
    }, 100);

  }

  onFilterEmit(event: any) {
    console.log(event)
    this.filterValue.emit(event);
  }

  onPageChangedEmit(event: any) {
    const { pageIndex, pageSize } = event;
    this.pageChanged.emit({ pageIndex, pageSize });
  }

  onSortEmit(event: any) {
    const { active, direction } = event;
    this.sortByEmit.emit({ active, direction })
  }

  currentIdAndModeEmit(emitData: any) {
    const { emitId, emitMode } = emitData;
    this.currentIdAndModeEmitter.emit({ emitId, emitMode });
  }

  popUp(id: number, mode: string) {
    const emitData = { emitId: id, emitMode: mode }
    this.currentIdAndModeEmit(emitData);
  }


  // loadingFunc(){
  //   this.loader.loadingEmitter.subscribe(res => {
  //     this.loadingStatus = res;
  //   })
  // }
}



