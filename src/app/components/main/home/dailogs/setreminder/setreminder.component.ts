import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { dateNotBeyondDeadlineValidator } from '../../../../../Validations/deadline.validation';
import { MatTable } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-setreminder',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    CommonModule,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './setreminder.component.html',
  styleUrl: './setreminder.component.scss',
})
export class SetreminderComponent {
  isDateSelected = null; // Flag to check if the user is using a specific date or days
  deadlineDate:Date = new Date();
  constructor(
    public dialogRef: MatDialogRef<SetreminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // This is the opportunity data passed to the dialog
    private fb: FormBuilder
  ) {
    this.initiateForm();
    this.deadlineDate = new Date(this.convertStringToDate(this.data.close_date));
  }
  
  convertStringToDate(dateString: string): Date {
    const month = parseInt(dateString.substring(0, 2), 10) - 1; // Months are 0-based in JS
    const day = parseInt(dateString.substring(2, 4), 10);
    const year = parseInt(dateString.substring(4, 8), 10);

    return new Date(year, month, day);
  }
  reminderForm!: FormGroup;
  initiateForm() {
    this.reminderForm = this.fb.group({
      reminderDays: [null],
      reminderDate: [null],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

    if (this.reminderForm.valid) {
      // Handle the reminder setting logic here
      const reminderData = this.reminderForm.value;
      let finalReminderDate = new Date();
      console.log('Reminder Data:', reminderData);
      if (reminderData.reminderDate) {
        console.log('reminderDate  :', reminderData);
        finalReminderDate = new Date(reminderData.reminderDate);

      } else {
        // If number of days before deadline is selected
      const reminderDays = reminderData.reminderDays;

      // Calculate the new reminder date by subtracting the days from deadlineDate
      const reminderDate = new Date(this.deadlineDate);
      reminderDate.setDate(reminderDate.getDate() - reminderDays); // Subtract days

      console.log('Calculated reminder date:', reminderDate);

      finalReminderDate = reminderDate; // Set the calculated reminder date
      }
      this.dialogRef.close(finalReminderDate); // Pass the data back on close
    }else{
      if(this.isDateSelected){
        this.reminderForm.get('reminderDate')?.markAsTouched();
      }else{
        this.reminderForm.get('reminderDays')?.markAsTouched();
      }
    }
  
  }

  toggleReminderMode(isDate: any) {
    this.isDateSelected = isDate;
    console.log(this.isDateSelected);
    if (isDate) {
      this.reminderForm.get('reminderDate')?.setValidators([Validators.required,dateNotBeyondDeadlineValidator(this.deadlineDate)]);
      this.reminderForm.get('reminderDays')?.clearValidators();
      this.reminderForm.get('reminderDays')?.setValue(null);
    } else {
      this.reminderForm.get('reminderDays')?.setValidators([Validators.required,Validators.min(1)]);
      this.reminderForm.get('reminderDate')?.clearValidators();
      this.reminderForm.get('reminderDate')?.setValue(null);
    }
    this.reminderForm.get('reminderDays')?.updateValueAndValidity();
  this.reminderForm.get('reminderDate')?.updateValueAndValidity();
    console.log(this.reminderForm.get('reminderDays'));
  }
}
