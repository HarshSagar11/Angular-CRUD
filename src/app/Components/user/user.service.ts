import { Injectable } from '@angular/core';
import { User } from '../../shared/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : User[] = [
    {
      id: 0,
      name: 'Harsh',
      gender: 'male',
      dob: 'Sat Dec 11 1999 00:00:00 GMT+0530 (India Standard Time)',
      age: 24,
      address: 'Sector 44 Noida',
      country: 'India',
      uid: uuid()
    },
    {
      id: 1,
      name: 'Sagar',
      gender: 'male',
      dob: 'Sat Jan 01 2000 05:30:00 GMT+0530 (India Standard Time)',
      age: 24,
      address: 'Sector 43 Noida',
      country: 'India',
      uid: uuid()
    },
    {
      id: 2,
      name: 'User1',
      gender: 'female',
      dob: 'Thu May 01 2003 05:30:00 GMT+0530 (India Standard Time)',
      age: 21,
      address: 'Sector 1 Noida',
      country: 'India',
      uid: uuid()
    },
  ]
  private savedUser = new BehaviorSubject<User[]>(this.user)
  public getSavedUser : Observable<User[]> = this.savedUser.asObservable();

  constructor() { }

  adduser(data : User){
    this.user.push(data);
    this.savedUser.next(this.user);
  }
  setUsers(data : User[]){
    this.savedUser.next(data);
  }
}
