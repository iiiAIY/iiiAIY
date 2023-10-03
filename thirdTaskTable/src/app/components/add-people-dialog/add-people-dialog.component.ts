import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-people-dialog',
  templateUrl: './add-people-dialog.component.html',
  styleUrls: ['./add-people-dialog.component.scss']
})
export class AddPeopleDialogComponent {

  constructor(private  dialogRef: MatDialogRef<AddPeopleDialogComponent>) {
  }

  closeDialog(isClosed : boolean) : void {
    if (isClosed) {
      this.dialogRef.close();
    }
  }
}
