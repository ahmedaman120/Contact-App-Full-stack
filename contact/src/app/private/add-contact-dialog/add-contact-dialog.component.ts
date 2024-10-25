import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
})
export class AddContactDialogComponent {
  contactForm: FormGroup;
  updateStatus: boolean = false
  constructor(
    private dialogRef: MatDialogRef<AddContactDialogComponent>,
    private fb: FormBuilder,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      phoneNumber: [data ? data.phoneNumber :'', Validators.required],
      address: [data ? data.address :'', [Validators.required]],
      notes: [data ? data.notes :'', [Validators.required]],
    });
    if(data){
      this.updateStatus = true
    }
  }

  addContact(): void {
    if (this.contactForm.valid && !this.updateStatus) {
      this.contactService.addContact(this.contactForm.value).subscribe(() => {
        this.dialogRef.close(true); // Close dialog and return true on success
      });
    }else{
      this.contactService.updateContact(this.data._id , this.contactForm.value).subscribe(() => {
        this.dialogRef.close(true); // Close dialog and return true on success
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
