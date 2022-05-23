import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  confirmResult = false;
  constructor(private modalService: NgbModal) { }

  @Output() closeEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('confirmModal') confirmation: ElementRef;
  
  ngOnInit(): void {
  }

  open() {
    this.modalService.open(this.confirmation, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false,
      centered: true,
  }).result.then((result) => {
      this.confirmResult = result;
      this.closeEmitter.emit(result);
    }, (reason) => {
      this.confirmResult = reason;
      this.closeEmitter.emit(reason)
    });
  }
}
