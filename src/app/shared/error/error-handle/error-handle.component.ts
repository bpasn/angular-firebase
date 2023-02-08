import { Component, Input } from '@angular/core';
import { ErrorHandle } from '../../services/interface/error-handle';

@Component({
  selector: 'app-error-handle',
  templateUrl: './error-handle.component.html',
  styleUrls: ['./error-handle.component.css']
})
export class ErrorHandleComponent {
  @Input('isOpen') isOpen: boolean = false;
  @Input() errorHandle: ErrorHandle | null | undefined = {};
  constructor() {
    console.log(this.errorHandle)
  }
}
