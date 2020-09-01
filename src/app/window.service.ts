import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WindowComponent} from './window/window.component';
import {ModalData} from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(
    public dialog: MatDialog
  ) { }

  windowRef: MatDialogRef<WindowComponent>;

  show(data: ModalData) {
    this.windowRef = this.dialog.open(WindowComponent, {data});
  }

}
