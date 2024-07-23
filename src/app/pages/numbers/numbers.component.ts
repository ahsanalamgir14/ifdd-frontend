import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { StorageService } from 'src/app/core/storage/storage.service';
import { Thematique } from 'src/app/thematiques/thematique';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { InnovationService } from 'src/app/innovations/innovation.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html'
})
export class NumbersComponent implements OnInit {
  numbers: any = {
    countriesCount: 21,
    thematiquesCount: 8,
    orgsCount: 0
  };
  thematiques: Thematique[] = [];
  countriesCount: number = 6;
  orgsCount: number = 0;
  loading: boolean = false;
  selectedThematique: Thematique | null = null;
  private timeout: any;
  language: string | null = 'fr';

  constructor(private thematiqueService: ThematiqueService, private innovationService: InnovationService, private storage: StorageService) { }

  ngOnInit(): void {
    this.language = this.storage.getItem('language');
    this.getThematiques();
  }

  onSelectThematique(thematique: Thematique): void {
    this.selectedThematique = thematique;
  }

  private countInnovations(): void {
    this.innovationService.count().subscribe((count: number) => {
      this.orgsCount = count;
      this.animateNumbers();
    })
  }

  private getThematiques(): void {
    this.loading = true;
    this.thematiqueService.getAll()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.thematiques = data;
        this.countInnovations();
      });
  }

  private animateNumbers(): void {
    if (this.numbers.countriesCount < this.countriesCount) {
      this.numbers.countriesCount++;
    }
    if (this.numbers.thematiquesCount < this.thematiques.length) {
      this.numbers.thematiquesCount++;
    }
    if (this.numbers.orgsCount < this.orgsCount) {
      this.numbers.orgsCount++;
    }

    if (this.numbers.countriesCount < this.countriesCount || this.numbers.thematiquesCount < this.thematiques.length || this.numbers.orgsCount < this.orgsCount) {
      this.timeout = setTimeout(() => this.animateNumbers(), 30);
    } else {
      clearTimeout(this.timeout);
    }
  }
}
