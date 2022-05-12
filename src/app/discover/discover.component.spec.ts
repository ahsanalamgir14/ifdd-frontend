import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NavbarStubComponent, SidebarStubComponent } from '../layout/base-layout/base-layout.component.spec';
import { MapService } from '../map/map.service';
import { MapStubComponent } from '../map/testing';
import { OscService } from '../oscs/osc.service';

import { DiscoverComponent } from './discover.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;
  let oscServiceSpy: jasmine.SpyObj<OscService>;

  beforeEach(async () => {
    const mockMapService = jasmine.createSpyObj('MapService', ['removeMarkers']);
    const mockOscService = jasmine.createSpyObj('OscService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [
        DiscoverComponent,
        NavbarStubComponent,
        SidebarStubComponent,
        MapStubComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MapService, useValue: mockMapService },
        { provide: OscService, useValue: mockOscService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    mapServiceSpy = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
    oscServiceSpy = TestBed.inject(OscService) as jasmine.SpyObj<OscService>;
    oscServiceSpy.getAll.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
