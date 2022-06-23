import { Component } from '@angular/core';
import { DialogRef } from '../dialog/dialog-ref';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html'
})
export class TermsComponent {

  constructor(private dialogRef: DialogRef,) { }
  onCancel(): void {
    this.dialogRef.close();
  }

}
