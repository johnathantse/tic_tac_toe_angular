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
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-end-modal',
  templateUrl: './game-end-modal.component.html',
  styleUrls: ['./game-end-modal.component.css'],
})
export class GameEndComponent implements OnInit, AfterViewInit {
  constructor(public activeModal: NgbActiveModal) {}

  @Input() playerName: String;
  @Input() tieGame: boolean;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
