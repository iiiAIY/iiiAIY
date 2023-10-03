import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddPeopleDialogComponent} from "../add-people-dialog/add-people-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // @ViewChild('changeButton') private chButton : ElementRef;

  constructor(private dialog: MatDialog) {
  }

  openDialogForm () {
    const dialogRef = this.dialog.open(AddPeopleDialogComponent, {
      restoreFocus: false,
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   this.chButton['_elementRef'].nativeElement
    //     .classList.remove('cdk-program-focused')
    // })
  }

}
