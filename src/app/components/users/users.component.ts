import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/components/users/models/user.model';
import { UsersService } from './users.service';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopUpService } from 'src/app/shared/pop-up/pop-up.service';

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
        this.usersList.map((i: any) => {
          return i.active = i.active == 0 ? i.active = 'False' : i.active = 'True'
        })
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

  popUp(data: User) {
    let details: any = {
      editBtn: true,
      saveBtn: true,
      createBtn: false,
      title: "User",
      label1: "Username",
      label2: "Active",
      showSaveBtn: this.popUpBtn
    }
    this.dialogService.openDialog(PopUpComponent, data, details)
      .subscribe(result => {
        console.log('The dialog was closed', result);
      });
  }

  updateUser(event: any = null, body: User) {
    this._service.updateUser(event.emitId, body)
  }


  onPageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllUsers();
  }

  onSort(event: any) {
    if (event.direction == "") {
      event.direction = "asc"
    }
    this.active = event.active;
    this.direction = event.direction;
    this.getAllUsers();
  }


}




