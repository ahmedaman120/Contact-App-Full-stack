import { Component, OnInit } from '@angular/core';
import { Contact, ContactService } from './contact.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit  {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['name', 'phoneNumber', 'address', 'notes', 'actions'];
  currentPage: number = 0;
  totalContacts: number = 0;
  contactsPerPage: number = 5;

  disabledContactIds: Set<string> = new Set();
  private messageSubscription: Subscription;
  updateForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null),
    name: new FormControl(null)
  });
  isUpdateMode: boolean = false;
  currentContactId: string | null = null;
  constructor(private socketService: SocketService,private contactService: ContactService, private fb: FormBuilder, private dialog: MatDialog) {
    this.messageSubscription = this.socketService
    .on(environment.updateStatusEvent)
    .subscribe((data: any)=>{
      console.log(data)
      data = JSON.parse(data)
      if (data && data.id) {
        if (data.status) {
          this.disabledContactIds.delete(data.id); // Enable the contact
        } else {
          this.disabledContactIds.add(data.id); // Disable the contact
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadContacts(this.currentPage);
  }

  loadContacts(page: number): void {
    this.contactService.getContacts(page).subscribe(response => {
      this.contacts = response.data;
      this.totalContacts = response.count; // Update total count
    });
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalContacts / this.contactsPerPage) - 1) {
      this.currentPage++;
      this.loadContacts(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadContacts(this.currentPage);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalContacts / this.contactsPerPage);
  }

  openUpdateForm(contact: Contact): void {
    this.isUpdateMode = true;
    this.currentContactId = contact._id;
    this.updateForm.patchValue({
      name: contact.name,
      phoneNumber: contact.phoneNumber
    });
  }

  deleteContact(contactId: string): void {
    this.contactService.deleteContact(contactId).subscribe((res)=>{
      console.log(res);
    })
  }

  updateContact(): void {
    if (this.currentContactId) {
      const updatedData = this.updateForm.value;
    }
  }

  cancelUpdate(): void {
    this.isUpdateMode = false;
    this.currentContactId = null;
    this.updateForm.reset();
  }

  openContactDialog(contact?: Contact): void {
    this.socketService.emit(environment.updateEventBroadcastName,JSON.stringify({id: contact?._id}))
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      data: contact // The contact object includes the ID
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
            this.loadContacts(this.currentPage);
      }
      this.socketService.emit(environment.finishedEventName,JSON.stringify({id: contact?._id}))
    });
  }
}
