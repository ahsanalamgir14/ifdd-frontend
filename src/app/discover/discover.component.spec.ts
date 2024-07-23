import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  NavbarStubComponent,
  SidebarStubComponent,
} from '../layout/base-layout/base-layout.component.spec';
import { MapService } from '../map/map.service';
import { MapStubComponent } from '../map/testing';
import { InnovationService } from '../innovations/innovation.service';

import { DiscoverComponent } from './discover.component';
import { Results } from '../innovations/results';
import { Innovation } from '../innovations/innovation';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;
  let innovationServiceSpy: jasmine.SpyObj<InnovationService>;
  const innovations = new Results<Innovation>();

  beforeEach(async () => {
    const mockMapService = jasmine.createSpyObj('MapService', [
      'removeMarkers',
    ]);
    const mockInnovationService = jasmine.createSpyObj('InnovationService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [
        DiscoverComponent,
        NavbarStubComponent,
        SidebarStubComponent,
        MapStubComponent,
      ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: MapService, useValue: mockMapService },
        { provide: InnovationService, useValue: mockInnovationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    mapServiceSpy = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
    innovationServiceSpy = TestBed.inject(InnovationService) as jasmine.SpyObj<InnovationService>;
    innovationServiceSpy.getAll.and.returnValue(of(innovations));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
