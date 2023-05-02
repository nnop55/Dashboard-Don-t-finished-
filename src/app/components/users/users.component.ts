import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/components/users/models/user.model';
import { UsersService } from './users.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpService } from 'src/app/shared/pop-up/pop-up.service';
import { DialogData, DialogMode } from 'src/app/shared/pop-up/models/dialog.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: any[] = [
    { columnDef: 'userId', header: 'UserId' },
    { columnDef: 'username', header: 'Username', isSortable: true },
    { columnDef: 'active', header: 'Active', isSortable: true },
    { columnDef: 'action', header: '' },
  ];

  usersList: User[] = [];
  popUpBtn: boolean = false;

  tableParams: any = {
    pageIndex: 0,
    pageSize: 5,
    sortBy: "username",
    sortOrder: "asc",
    searchTerm: ''
  }

  totalItems: number = 0;
  // pageIndex: number = 0;
  // pageSize: number = 5;
  // sortBy: string = "Username";
  // sortOrder: string = "asc";
  // searchTerm!: string;

  loadingStatus: boolean = true;

  constructor(private _service: UsersService,
    public dialog: MatDialog,
    private dialogService: PopUpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // if (Object.keys(this.routeParams).length === 0) {
    //   this.carData = res;
    // }
    this.getParams();
  }

  getAllUsers() {
    const pageIndex = this.tableParams.pageIndex + 1;
    const pageSize = this.tableParams.pageSize;
    const sortBy = this.tableParams.sortBy;
    const sortOrder = this.tableParams.sortOrder;

    this._service.getAllUsers(pageIndex, pageSize, sortBy, sortOrder, this.tableParams.searchTerm).subscribe((data: any) => {
      this.totalItems = data.totalItems;
      if (this.totalItems > 0) {
        this.usersList = data.users;
        this.loadingStatus = false;
      }
      this.updateRouteParams();
    });

  }

  callPopUp(event: any) {
    if (event.emitMode != 'create') {
      this._service.getUserById(event.emitId).subscribe((res: User) => {
        if (res) {
          this.popUp(res, event)
        } else {
          alert("Not Found")
        }
      })
    } else {
      this.popUp({ userId: 0, username: '', active: 0 }, event)
    }
  }

  popUp(data: User, event: any) {
    let checkMode: DialogMode = { edit: false, save: false, create: false, delete: false, title: '', mode: 'none' }

    switch (event.emitMode) {
      case 'create':
        checkMode = { edit: false, save: false, create: true, delete: false, title: 'Create user', mode: 'create' }
        break;
      case 'edit':
        checkMode = { edit: true, save: true, create: false, delete: false, title: 'Update user', mode: 'edit' }
        break;
      case 'delete':
        checkMode = { edit: false, save: false, create: false, delete: true, title: 'Are you sure delete this user?', mode: 'delete' }
        break;
    }

    const dialogData: DialogData = {
      data: data,
      fields: [
        { label: "User ID", type: "number", index: "userId" },
        { label: "User Name", type: "text", index: "username" },
        { label: "Active", type: "selector", index: "active" },
      ],
      title: checkMode.title,
      editBtn: checkMode.edit,
      saveBtn: checkMode.save,
      createBtn: checkMode.create,
      deleteBtn: checkMode.delete,
      showSaveBtn: this.popUpBtn,
      mode: checkMode.mode
    }

    this.dialogService.openDialog(PopUpComponent, dialogData)
      .subscribe(result => {
        if (result) {
          switch (dialogData.mode) {
            case 'create':
              this.createUser(result)
              break;
            case 'edit':
              this.updateUser(result.userId, result);
              break;
            case 'delete':
              this.deleteUser(result.userId);
              break;
          }
        }
      });

  }

  updateUser(id: number, body: User) {
    this._service.updateUser(id, body).subscribe((res: any) => {
      if (res.status == "OK") {
        this.getAllUsers();
      } else {
        console.log("ERROR in Update")
      }
    })
  }

  createUser(body: User) {
    this._service.createUser(body).subscribe((res: any) => {
      this.getAllUsers();
    })
  }

  deleteUser(id: number) {
    this._service.deleteUser(id).subscribe((res: any) => {
      this.getAllUsers();
    })
  }

  onPageChanged(event: any) {
    this.tableParams.pageIndex = event.pageIndex;
    this.tableParams.pageSize = event.pageSize;
    this.getAllUsers();
  }

  onSort(event: any) {
    if (event.direction == "") event.direction = "asc";
    this.tableParams.sortBy = event.active;
    this.tableParams.sortOrder = event.direction;
    this.getAllUsers();
  }


  onFilterSearch(filterValue: any) {
    this.tableParams.searchTerm = filterValue;
    this.getAllUsers();
  }

  getParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params, this.tableParams)


      this.tableParams.pageIndex = parseInt(params['pageIndex']) ? parseInt(params['pageIndex']) : 0;
      this.tableParams.pageSize = parseInt(params['pageSize']) ? parseInt(params['pageSize']) : 5;
      this.tableParams.sortBy = params['sortBy'] ? params['sortBy'] : 'username';
      this.tableParams.sortOrder = params['sortOrder'] ? params['sortOrder'] : 'asc';
      this.tableParams.searchTerm = params['filter'] ? params['filter'] : '';

      this.getAllUsers();



    });
  }

  updateRouteParams() {
    const queryParams = {
      pageIndex: this.tableParams.pageIndex,
      pageSize: this.tableParams.pageSize,
      sortBy: this.tableParams.sortBy,
      sortOrder: this.tableParams.sortOrder,
      filter: this.tableParams.searchTerm
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    });
  }


}




