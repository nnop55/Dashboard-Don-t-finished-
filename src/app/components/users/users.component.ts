import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/components/users/models/user.model';
import { UsersService } from './users.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopUpService } from 'src/app/shared/pop-up/pop-up.service';
import { NumberToBooleanPipe } from 'src/app/shared/pipes/number-to-boolean.pipe';

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
  // userForm!: FormGroup;
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
    private fb: FormBuilder,
    private dialogService: PopUpService) {
    // this.myForm = this.fb.group({
    //   userId: new FormControl(null),
    //   username: new FormControl(null, Validators.required),
    //   active: new FormControl(null, Validators.required)
    // });
  }

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
    this._service.getuserById(event.emitId).subscribe((res: User) => {
      if (res) {
        this.popUp(res)
      } else {
        alert("Not Found")
      }
    })
  }

  popUp(data: User = { userId: 0, username: '', active: 0 }) {
    let checkMode = { edit: false, save: false, create: false, mode: 'none' }
    if (data.userId == 0) {
      checkMode = { edit: false, save: false, create: true, mode: 'create' }
    } else {
      checkMode = { edit: true, save: true, create: false, mode: 'edit' }
    }
    const dialogData = {
      data: data,
      fields: [
        { label: "User ID", type: "number", index: "userId" },
        { label: "User Name", type: "text", index: "username" },
        { label: "Active", type: "selector", index: "active" },
      ],
      title: "User",
      editBtn: checkMode.edit,
      saveBtn: checkMode.save,
      createBtn: checkMode.create,
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
          }
        }
      });
  }

  updateUser(id: any, body: User) {
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


}




