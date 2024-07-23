import { Component, Input, OnInit } from '@angular/core';
import { ThematiqueService } from '../thematique.service';

@Component({
  selector: 'app-active-thematiques',
  templateUrl: './active-thematiques.component.html'
})
export class ActiveThematiquesComponent implements OnInit {
  @Input() ids: Set<number> = new Set<number>();
  @Input() selected: boolean = false;
  colors: any = {};
  colorIds: string[] = [];

  constructor(private thematiqueService: ThematiqueService) {}

  ngOnInit(): void {
    this.colors = this.thematiqueService.getColors();
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
