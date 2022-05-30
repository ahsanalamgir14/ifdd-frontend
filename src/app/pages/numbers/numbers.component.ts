import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { OscService } from 'src/app/oscs/osc.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html'
})
export class NumbersComponent implements OnInit {
  numbers: any = {
    countriesCount: 0,
    oddsCount: 0,
    orgsCount: 0
  };
  odds: Odd[] = [];
  countriesCount: number = 2;
  orgsCount: number = 0;
  loading: boolean = false;
  selectedOdd: Odd | null = null;
  private timeout: any;

  constructor(private oddService: OddService, private oscService: OscService) { }

  ngOnInit(): void {
    this.getOdds();
  }

  onSelectOdd(odd: Odd): void {
    this.selectedOdd = odd;
  }

  private countOscs(): void {
    this.oscService.count().subscribe((count: number) => {
      this.orgsCount = count;
      this.animateNumbers();
    })
  }

  private getOdds(): void {
    this.loading = true;
    this.oddService.getAll()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.odds = data;
        this.countOscs();
      });
  }

  private animateNumbers(): void {
    if (this.numbers.countriesCount < this.countriesCount) {
      this.numbers.countriesCount++;
    }
    if (this.numbers.oddsCount < this.odds.length) {
      this.numbers.oddsCount++;
    }
    if (this.numbers.orgsCount < this.orgsCount) {
      this.numbers.orgsCount++;
    }

    if (this.numbers.countriesCount < this.countriesCount || this.numbers.oddsCount < this.odds.length || this.numbers.orgsCount < this.orgsCount) {
      this.timeout = setTimeout(() => this.animateNumbers(), 30);
    } else {
      clearTimeout(this.timeout);
    }
  }
}
