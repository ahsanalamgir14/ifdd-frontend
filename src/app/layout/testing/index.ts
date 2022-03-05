import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-search-bar',
  template: 'search bar works!'
})
export class SearchBarStubComponent {
  @Input() isFull = false;
}
