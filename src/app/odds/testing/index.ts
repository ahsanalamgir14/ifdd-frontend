import { Component, Input } from "@angular/core";
import { Odd } from "../odd";

@Component({
  selector: 'app-odd',
  template: 'odd works!'
})
export class OddStubComponent {
  @Input() odd: Odd|null = null;
  @Input() selected = false;
  @Input() lite = false;
}
