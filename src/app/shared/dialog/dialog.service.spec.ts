import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

@Component({
  selector: 'app-test-dialog',
  template: 'test dialog!'
})
export class TestDialogStubComponent {}

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDialogStubComponent ],
      imports: [ OverlayModule ]
    });
    service = TestBed.inject(DialogService);
  });

  it('should open and close the dialog', () => {
    const dialogRef = service.open(TestDialogStubComponent);
    expect(dialogRef).toBeTruthy();

    dialogRef.afterClosed().subscribe(result => {
      expect(result).toBeTrue();
    });

    dialogRef.close(true);
  });
});
