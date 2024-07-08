import { Component, ElementRef, EventEmitter, HostListener, Input, Output, output, Renderer2, SimpleChange, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/common';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { v4 as uuid } from 'uuid'
declare var Datepicker: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  @ViewChild('dateInput') toggleButton: ElementRef;
  @ViewChild('calendar') calendar: ElementRef;

  @Input() userData : User
  @Output() closeModal = new EventEmitter<any>()
  userForm : FormGroup;
  showDatepicker : boolean = false;
  isEdit : boolean = false;
  allUser : User[];
  dateModal : any;

  @ViewChild('dateField', { static: true }) dateField!: ElementRef;

  public selectedDate!: Date;

  constructor(private renderer : Renderer2, private datePipe : DatePipe, private userService : UserService){
    this.userService.getSavedUser.subscribe(data=>{
      this.allUser = data;
    })
  }
  ngOnInit(): void {
    this.initDatePicker();
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.toggleButton.nativeElement.contains(e.target) && !this.calendar.nativeElement.contains(e.target)) {
        this.showDatepicker = false;
      }
    });
  }

  ngOnChanges(changes : SimpleChange){
    if('userData' in changes){
      if(this.userData!==null && this.userData!=undefined){
        this.isEdit = true;
        this.preFillForm();
      }else{
        this.isEdit = false;
        this.initForm()
      }
    }
  }

  preFillForm(){
    this.userForm.patchValue({
      id : this.userData.id,
      name : this.userData.name,
      gender : this.userData.gender == 'female',
      dob : this.userData.dob,
      age : this.userData.age,
      address : this.userData.address,
      country : this.userData.country,
    })
    this.userForm.get('id')?.disable()
    // let date = new Datepicker(this.dateField.nativeElement, {
    //   maxDate: new Date(),
    //   todayHighlight: true,
    //   daysOfWeekDisabled: [0],
    // });
    let dob = this.datePipe.transform(new Date(this.userData.dob), 'dd/MM/yyyy')
    this.dateModal.setDate(dob)
  }

  initForm(){
    this.userForm = new FormGroup({
      id : new FormControl('',[Validators.required]),
      name : new FormControl('',[Validators.required]),
      gender : new FormControl(false),
      dob : new FormControl('',[Validators.required]),
      age : new FormControl({value:'',disabled:true},[Validators.required]),
      address : new FormControl('',[Validators.required]),
      country : new FormControl('',[Validators.required]),
    })
  }

  initDatePicker(): void {
    this.dateModal = new Datepicker(this.dateField.nativeElement, {
      maxDate: new Date(),
      todayHighlight: true,
      daysOfWeekDisabled: [0],
    });
    let dateToday = this.datePipe.transform(new Date(), 'dd/MM/yyyy')
    this.dateModal.setDate(dateToday)
    // console.log('datepicker', Datepicker);
  }

  onDatePicked($event: any) {
    this.selectedDate = new Date($event.detail.date);
    this.userForm.patchValue({
      dob : this.selectedDate.toDateString()
    })
    this.showDatepicker = false
    this.getAge();
    // console.log('onDatePicked', this.selectedDate);
  }

  getAge(){
    var today = new Date();
    var age = today.getFullYear() - this.selectedDate.getFullYear();
    var m = today.getMonth() - this.selectedDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.selectedDate.getDate())) {
        age--;
    }
    this.userForm.patchValue({
      age: age
    })
  }
  saveUser(){
    if(!this.userForm.valid) return;
    let userData : User ={
      id: this.userForm.get('id')?.value,
      name: this.userForm.get('name')?.value,
      gender: this.userForm.get('gender')?.value ? 'female' : 'male',
      dob: this.selectedDate.toDateString(),
      age: this.userForm.get('age')?.value,
      address: this.userForm.get('address')?.value,
      country: this.userForm.get('country')?.value,
      uid: this.userData?.uid ? this.userData?.uid : uuid()
    }
    if(this.isEdit){
      for(let i=0; i<this.allUser.length; i++){
        if(this.allUser[i].uid == userData.uid){
          this.allUser[i] = userData;
        }
      }
      this.userService.setUsers(this.allUser);
    }else{
      this.userService.adduser(userData)
    }
    console.log(userData);
    this.initForm();
    this.closeModal.emit()
  }
}
