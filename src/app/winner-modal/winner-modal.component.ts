import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css']
})
export class WinnerModalComponent implements OnInit{

  constructor(private modalService: NgbModal) { }
  @Input() playerName: string;

  ngOnInit(): void {
  }

  open(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
