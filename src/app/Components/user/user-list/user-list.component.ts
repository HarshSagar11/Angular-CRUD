import { AddressShortnerPipe } from './../../../shared/address-shortner.pipe';
import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../../shared/common';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @ViewChild(MatSort) sort: MatSort;

  
  users : User[] = [];
  displayedColumns: string[] = ['id', 'name', 'gender', 'dob', 'age','address','country', 'edit','delete'];
  showUser : boolean = false;
  isEdit : boolean = false;
  dataSource = new MatTableDataSource(this.users);
  userDataToEdit : any;
  userIndex: number;
  
  constructor(public userService : UserService, private _liveAnnouncer: LiveAnnouncer, public addressShortnerPipe :AddressShortnerPipe){}

  ngOnInit(){
    this.userService.getSavedUser.subscribe((users)=>{
      this.users = users;
      this.matTable()
    })

    console.log(this.users)
  }

  ngAfterViewInit(){
    console.log('init');
    this.matTable();
  }

  matTable() {
    this.dataSource = new MatTableDataSource(this.users)
    this.dataSource.sort = this.sort;
    this.showUser = true;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editUser(user : User,index : number){
    this.isEdit = true
    this.userDataToEdit = user;
    this.openModal();
    console.log(user)
  }
  deleteUser(user : User){
    let index:number;
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].uid == user.uid){
        index=i;
        this.users.splice(index,1);
        break;
      }
    }
    this.userService.setUsers(this.users);
  }
  
  addUser(){
    this.isEdit = false;
    this.userDataToEdit = null;
    this.userIndex = -1
    this.openModal()
  }
  
  openModal(){
    document.getElementById('default-modal')?.classList.remove('hidden');
    document.getElementById('userTable')?.classList.add('blur-sm');
  }
  
  closeModal(){
    document.getElementById('default-modal')?.classList.add('hidden');
    document.getElementById('userTable')?.classList.remove('blur-sm');
  }
}
