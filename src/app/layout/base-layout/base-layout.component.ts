import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent implements OnInit{
  oddNumber: string = '';
  oscId?: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const oddNumber = this.route.snapshot.queryParamMap.get('odd');

    let oscIdString = this.route.snapshot.queryParamMap.get('oscId');
      if (oscIdString) {
        try {
          const id = Number.parseInt(oscIdString);
          this.oscId = id;
        } catch (exception) {}
      }

    if (oddNumber) {
      this.oddNumber = oddNumber;
    }
  }
}
