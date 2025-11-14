import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-button',
  templateUrl: './circular-button.component.html',
  styleUrls: ['./circular-button.component.scss']
})
export class CircularButtonComponent implements OnChanges {
  @Output() buttonClicked = new EventEmitter<number>();
  @Input() stateChange: number | undefined;
  //0 start
  //1 started
  //2 stopped
  state = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stateChange']) {
      if (this.state != this.stateChange) {
        this.state = 0;
      }
    }
  }

  emitClick() {
    this.checkState();
    this.buttonClicked.emit(this.state);
  }

  checkState() {
    switch (this.state) {
      case 0:
        this.state = 1;
        break;
      case 1:
        this.state = 2;
        break;
      case 2:
        this.state = 1;
        break;
      default:
    }
  }
}
