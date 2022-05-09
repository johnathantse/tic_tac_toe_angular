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
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css'],
})
export class WinnerModalComponent implements OnInit, AfterViewInit {
  constructor(private modalService: NgbModal) {}

  @Input() playerName?: string;
  @Output() public resetGameEmitter = new EventEmitter();
  @ViewChild('content') contentRef: ElementRef;
  private _modalRef: NgbModalRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.openModal();
  }

  openModal() {
    this._modalRef = this.modalService.open(this.contentRef);
  }

  public closeModal() {
    this._modalRef.close();
    this.resetGameEmitter.emit();
  }
}
