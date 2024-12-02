import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormatDatePipe } from '../../../../pipes/format-date.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-viewmoredialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormatDatePipe,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './viewmoredialog.component.html',
  styleUrl: './viewmoredialog.component.scss',
})
export class ViewmoredialogComponent {
  readonly dialog = inject(MatDialog);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  close() {
    this.dialog.closeAll();
  }
}
