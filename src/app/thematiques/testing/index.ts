import { Component, Input } from "@angular/core";
import { Thematique } from "../thematique";

@Component({
  selector: 'app-thematique',
  template: 'thematique works!'
})
export class ThematiqueStubComponent {
  @Input() thematique: Thematique|null = null;
  @Input() selected = false;
  @Input() lite = false;
}
