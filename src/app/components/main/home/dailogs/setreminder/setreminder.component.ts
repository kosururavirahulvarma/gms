import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { OpportunityFinderComponent } from '../../opportunity-finder/opportunity-finder.component';


@Component({
  selector: 'app-setreminder',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './setreminder.component.html',
  styleUrl: './setreminder.component.scss'
})
export class SetreminderComponent {

  readonly dialogRef = inject(MatDialogRef<OpportunityFinderComponent>);
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
