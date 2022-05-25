import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-end-modal',
  templateUrl: './game-end-modal.component.html',
  styleUrls: ['./game-end-modal.component.css'],
})
export class GameEndComponent implements OnInit, AfterViewInit {
  constructor(private modalService: NgbModal) {}

  @Input() playerName: String;
  @Input() tieGame: boolean;
  @Output() public resetGameEmitter = new EventEmitter();
  @ViewChild('content') contentRef: ElementRef;
  private _modalRef: NgbModalRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.openModal();
  }

  openModal() {
    this._modalRef = this.modalService.open(this.contentRef, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  public closeModal() {
    this._modalRef.close();
    this.resetGameEmitter.emit();
  }
}
