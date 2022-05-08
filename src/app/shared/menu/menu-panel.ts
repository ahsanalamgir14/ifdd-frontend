import { TemplateRef, EventEmitter } from "@angular/core";

export interface MenuPanel {
  templateRef: TemplateRef<any>;
  readonly closed: EventEmitter<void>;
}
