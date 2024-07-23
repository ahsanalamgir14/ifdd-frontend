import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent implements OnInit{
  thematiqueNumber: string = '';
  innovationId?: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const thematiqueNumber = this.route.snapshot.queryParamMap.get('thematique');

    let innovationIdString = this.route.snapshot.queryParamMap.get('innovationId');
      if (innovationIdString) {
        try {
          const id = Number.parseInt(innovationIdString);
          this.innovationId = id;
        } catch (exception) {}
      }

    if (thematiqueNumber) {
      this.thematiqueNumber = thematiqueNumber;
    }
  }
}
