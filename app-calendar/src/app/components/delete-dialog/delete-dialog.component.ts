import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'src/app/models/CalendarEvent';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  response:{deleteRepeating:boolean}={deleteRepeating:false}

  constructor(@Inject(MAT_DIALOG_DATA) public data:CalendarEvent) { }

  ngOnInit(): void {
  }

}
