import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css'],
})
export class WinnerModalComponent implements OnInit, AfterViewInit{
  constructor(private modalService: NgbModal) {}
  @Input() playerName?: string;

  @ViewChild('content') contentRef: ElementRef;
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.contentRef, { ariaLabelledBy: 'modal-basic-title' });
  }
}
