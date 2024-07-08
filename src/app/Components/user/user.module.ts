import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { HomeModule } from '../home/home.module';
import { MatTableModule } from '@angular/material/table' 
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AddressShortnerPipe } from '../../shared/address-shortner.pipe';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    AddressShortnerPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HomeModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  exports:[
    UserListComponent
  ],
  providers:[DatePipe,AddressShortnerPipe]
})
export class UserModule { }
