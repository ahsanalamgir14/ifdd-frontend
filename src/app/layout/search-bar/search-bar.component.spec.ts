import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MapLocation } from 'src/app/places/map-location';
import { Place } from 'src/app/places/place';
import { PlaceService } from 'src/app/places/place.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let placeServiceSpy: jasmine.SpyObj<PlaceService>;

  beforeEach(async () => {
    const placeServiceMock = jasmine.createSpyObj('PlaceService', ['searchPlaces']);
    const mobileQueryMock = {

    }

    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [ SharedModule, TranslateModule.forRoot() ],
      providers: [
        { provide: PlaceService, useValue: placeServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    placeServiceSpy = TestBed.inject(PlaceService) as jasmine.SpyObj<PlaceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search places', fakeAsync(() => {
    const places = [
      new MapLocation('Cotonou, Benin (ville)', 1.1, 1.1, [1, 0, 0, 1]),
      new MapLocation('Yaounde, Cameroon', 1.1, 1.1, [1, 0, 0, 1]),
    ];
    placeServiceSpy.searchPlaces.and.returnValue(of(places));
    const searchInput = fixture.debugElement.query(By.css('input[name="name"]'));
    searchInput.nativeElement.value = 'Cotonou';
    searchInput.nativeElement.dispatchEvent(new Event('keyup'));
    tick(500);
    fixture.detectChanges();

    expect(component.places.length).toBe(2);
  }));

  it('should select a place', fakeAsync(() => {
    const places = [
      new MapLocation('Cotonou, Benin (ville)', 1.1, 1.1, [1, 0, 0, 1]),
      new MapLocation('Yaounde, Cameroon', 1.1, 1.1, [1, 0, 0, 1]),
    ];
    placeServiceSpy.searchPlaces.and.returnValue(of(places));
    const searchInput = fixture.debugElement.query(By.css('input[name="name"]'));
    searchInput.nativeElement.value = 'Cotonou';
    searchInput.nativeElement.dispatchEvent(new Event('keyup'));
    tick(500);
    fixture.detectChanges();

    expect(component.places.length).toEqual(2);

    const placeEl = fixture.debugElement.query(By.css('[data-test-id="place"]'));
    placeEl.triggerEventHandler('click', null);

    expect(component.place).toEqual('Cotonou, Benin (ville)');
  }));

  it('should select a place and clear it', fakeAsync(() => {
    const places = [
      new MapLocation('Cotonou, Benin (ville)', 1.1, 1.1, [1, 0, 0, 1]),
      new MapLocation('Yaounde, Cameroon', 1.1, 1.1, [1, 0, 0, 1]),
    ];
    placeServiceSpy.searchPlaces.and.returnValue(of(places));
    const searchInput = fixture.debugElement.query(By.css('input[name="name"]'));
    searchInput.nativeElement.value = 'Cotonou';
    searchInput.nativeElement.dispatchEvent(new Event('keyup'));
    tick(500);
    fixture.detectChanges();

    const placeEl = fixture.debugElement.query(By.css('[data-test-id="place"]'));
    placeEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('form button'));
    clearButton.triggerEventHandler('click', null);
    expect(component.place).toEqual('');
  }));

  it('should return values for mobile', () => {
    // TODO: mock this
    component.mobileQuery = {
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
      media: '',
      onchange: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: (event: Event) => true
    };

    expect(component.getOverlayOffset()).toEqual(0);
    expect(component.getOverlayWidth()).toEqual('100%');
    expect(component.getConnectedOverlayPanelClasses()).toEqual(['fixed', '!bottom-0', '!left-0', '!right-0']);
  });
});
