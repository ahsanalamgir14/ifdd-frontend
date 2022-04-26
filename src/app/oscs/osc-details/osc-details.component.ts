import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { Category } from 'src/app/odds/category';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { Osc } from '../osc';
import { OscService } from '../osc.service';

@Component({
  selector: 'app-osc-details',
  templateUrl: './osc-details.component.html'
})
export class OscDetailsComponent {
  @Input() set selectedOsc(osc: Osc) {
    this.osc = osc;
    this.getOsc();
  };
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();
  osc?: Osc;
  odds: Odd[] = [];
  loading: boolean = false;
  colors: any = {};
  showCategoriesDetails: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef, private oscService: OscService, oddService: OddService) {
    this.colors = oddService.getColors();
  }

  getOsc(): void {
    if (this.osc?.id) {
      this.loading = true;
      this.oscService.get(this.osc.id).pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((osc: Osc) => {
        this.osc = osc;
        this.getOdds();
        this.changeDetector.detectChanges();
      })
    }
  }

  onHide(): void {
    this.hide.emit(true);
  }

  onToggleCategoriesDetails(): void {
    this.showCategoriesDetails = !this.showCategoriesDetails;
  }

  private getOdds(): void {
    this.odds = [];
    this.osc?.categorieOdds.forEach((category: Category) => {
      if (this.odds.find(odd => odd.id === category.odd.id) === undefined) {
        this.odds.push(category.odd);
      }
    });
  }
}
