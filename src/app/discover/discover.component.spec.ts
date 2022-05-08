import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarStubComponent, SidebarStubComponent } from '../layout/base-layout/base-layout.component.spec';
import { MapService } from '../map/map.service';
import { MapStubComponent } from '../map/testing';
import { DialogService } from '../shared/dialog/dialog.service';

import { DiscoverComponent } from './discover.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  let dialogService: jasmine.SpyObj<DialogService>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;

  beforeEach(async () => {
    const mockDialogService = jasmine.createSpyObj('DialogService', ['open']);
    const mockMapService = jasmine.createSpyObj('MapService', ['removeMarkers']);

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
        { provide: DialogService, useValue: mockDialogService },
        { provide: MapService, useValue: mockMapService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    mapServiceSpy = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
