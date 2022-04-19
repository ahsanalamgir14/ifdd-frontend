import { Component, Input, OnInit } from '@angular/core';
import { OddService } from '../odd.service';

@Component({
  selector: 'app-active-odds',
  templateUrl: './active-odds.component.html'
})
export class ActiveOddsComponent implements OnInit {
  @Input() ids: Set<number> = new Set<number>();
  @Input() selected: boolean = false;
  colors: any = {};
  colorIds: string[] = [];

  constructor(private oddService: OddService) {}

  ngOnInit(): void {
    this.colors = this.oddService.getColors();
    this.colorIds = Object.keys(this.colors);
  }

  isActive(id: string): boolean {
    return this.ids.has(Number.parseInt(id));
  }

  getStyles(id: string): object {
    if (this.isActive(id)) {
      return {
        'background-color': this.colors[id],
      }
    }
    if (this.selected) {
      return {
        'background-color': 'rgba(255, 255, 255, 0.1)',
      }
    }

    return {
      'background-color': '#ecfbed',
    };
  }
}
