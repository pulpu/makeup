import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {
  @Input() item: {}
  constructor() { }

  ngOnInit() {
  }

}
