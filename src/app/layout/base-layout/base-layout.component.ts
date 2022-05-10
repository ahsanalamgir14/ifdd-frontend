import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent implements OnInit{
  oddNumber: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const oddNumber = this.route.snapshot.queryParamMap.get('odd');
    if (oddNumber) {
      this.oddNumber = oddNumber;
    }
  }
}
