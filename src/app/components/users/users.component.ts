import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/components/users/models/user.model';
import { UsersService } from './users.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpService } from 'src/app/shared/pop-up/pop-up.service';
import { NumberToBooleanPipe } from 'src/app/shared/pipes/number-to-boolean.pipe';
import { DialogData, DialogMode } from 'src/app/shared/pop-up/models/dialog.model';

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


  totalItems: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;
  active: string = "Username";
  direction: string = "asc";
  myForm: any;
  numberToBooleanPipe = new NumberToBooleanPipe();

  constructor(private _service: UsersService,
    public dialog: MatDialog,
    private dialogService: PopUpService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    const pageIndex = this.pageIndex + 1;
    const pageSize = this.pageSize;
    const sortBy = this.active;
    const sortOrder = this.direction;

    this._service.getAllUsers(pageIndex, pageSize, sortBy, sortOrder).subscribe((data: any) => {
      this.totalItems = data.totalItems;
      if (this.totalItems > 0) {
        this.usersList = data.users;
      }
    });

  }

  getUserById(event: any) {
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
    console.log(event)
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


  onPageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllUsers();
  }

  onSort(event: any) {
    if (event.direction == "") event.direction = "asc";
    this.active = event.active;
    this.direction = event.direction;
    this.getAllUsers();
  }

  deleteUser(id: number) {
    this._service.deleteUser(id).subscribe((res: any) => {
      this.getAllUsers();
    })
  }

}




