import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalData} from '../interfaces';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData,
              private windowRef: MatDialogRef<WindowComponent>) { }

  ngOnInit(): void {
  }

  ok() {
    this.windowRef.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.ok();
  }
}
