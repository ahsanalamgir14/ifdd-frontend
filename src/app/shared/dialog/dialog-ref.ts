import {ESCAPE, hasModifierKey} from '@angular/cdk/keycodes';
import { OverlayRef } from "@angular/cdk/overlay";
import { filter, Observable, Subject } from "rxjs";

export class DialogRef {
  private afterClosedSubject = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {
    this.overlayRef.keydownEvents().pipe(
      filter((event: KeyboardEvent) => {
        return event.keyCode === ESCAPE && !hasModifierKey(event);
      })
    )
    .subscribe((event) => {
      event.preventDefault();
      this.close();
    });

    this.overlayRef.backdropClick().subscribe((event) => {
      event.preventDefault();
      this.close();
    });
  }

  public close(result?: any) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}
