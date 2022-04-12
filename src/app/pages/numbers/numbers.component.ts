import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html'
})
export class NumbersComponent implements OnInit {
  numbers: any = {
    countriesCount: 2,
    oddsCount: 17,
    orgsCount: 551
  };
  odds: Odd[] = [];
  loading: boolean = false;
  selectedOdd: Odd | null = null;

  constructor(private oddService: OddService) { }

  ngOnInit(): void {
    this.getOdds();
  }

  onSelectOdd(odd: Odd): void {
    this.selectedOdd = odd;
  }

  private getOdds(): void {
    this.loading = true;
    this.oddService.getAll()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.odds = data;
      });
  }
}
