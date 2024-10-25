import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ContctRouterModule } from './private-routing.module';
import {MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    ContactComponent,
    AddContactDialogComponent
  ],
  imports: [
    CommonModule,
    ContctRouterModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    SocketService
  ]
})
export class PrivateModule { }
