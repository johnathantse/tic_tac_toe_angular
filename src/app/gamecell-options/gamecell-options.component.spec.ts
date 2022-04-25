import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamecellOptionsComponent } from './gamecell-options.component';

describe('GamecellOptionsComponent', () => {
  let component: GamecellOptionsComponent;
  let fixture: ComponentFixture<GamecellOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamecellOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamecellOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
