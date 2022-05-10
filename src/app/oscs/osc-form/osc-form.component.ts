import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Collection, Feature, Map as OlMap, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Control} from 'ol/control';
import { applyTransform, Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, getTransform, Projection, toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Country } from 'src/app/places/country';
import { MapLocation } from 'src/app/places/map-location';
import { PlaceService } from 'src/app/places/place.service';
import { DialogRef } from 'src/app/shared/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/dialog/dialog-tokens';
import { Step } from 'src/app/shared/stepper/step';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { finalize } from 'rxjs';
import { Category } from 'src/app/odds/category';
import { ZoneIntervention } from '../zone-intervention';
import { OscService } from '../osc.service';
import { Osc } from '../osc';

const enum LocationTypes {
  INTERVENTION_ZONE,
  HEADQUARTERS
};

@Component({
  selector: 'app-osc-form',
  templateUrl: './osc-form.component.html'
})
export class OscFormComponent implements OnInit {
  @Input() center: Coordinate = [17.7578122, 11.5024338];
  view?: View;
  projection: Projection|null = null;
  map?: OlMap;
  markerSource: VectorSource = new VectorSource();
  markerMap: Map<string, Feature> = new Map();
  get steps(): Step[] {
    return [
      {
        position: 1,
        title: this.i18n.instant('title.information')
      },
      {
        position: 2,
        title: this.i18n.instant('title.localization')
      },
      {
        position: 3,
        title: this.i18n.instant('title.objectives')
      },
      {
        position: 4,
        title: this.i18n.instant('title.details')
      }
    ];
  };
  selectedStep: Step = this.steps[0];
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    abbreviation: new FormControl('', [Validators.required]),
    numero_osc: new FormControl('', [Validators.required]),
    pays: new FormControl('', [Validators.required]),
    date_fondation: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    personne_contact: new FormControl('', [Validators.required]),
    dialCode: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    email_osc: new FormControl('', [Validators.required, Validators.email]),
    site_web: new FormControl('', []),
    facebook: new FormControl('', []),
    twitter: new FormControl('', []),
    instagram: new FormControl('', []),
    linkedin: new FormControl('', []),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    siege: new FormControl({value: '', disabled: true}, [Validators.required]),
    siege_alt: new FormControl('', []),
    interventionZones: new FormArray([]),
    interventionZonesAlt: new FormArray([]),
    categories: new FormArray([])
  });
  countries: Country[] = [];
  availableSocialNetworks: string[] = ['twitter', 'instagram', 'linkedin'];
  usedSocialNetworks: string[] = ['facebook'];
  selectedLocation: MapLocation | null = null;
  interventionZones: MapLocation[] = [];
  categoriesMap: Map<number, Category> = new Map();
  categories: Category[] = [];
  odds: Odd[] = [];
  loading: boolean = false;
  categoryDescMaxLength: number = 400;
  errors: any = {};

  constructor(
    private i18n: TranslateService,
    private dialogRef: DialogRef,
    private placeService: PlaceService,
    private oddService: OddService,
    private oscService: OscService,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.placeService.getCountries().subscribe((countries: Country[]) => this.countries = countries);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    const value = this.form.getRawValue();

    value.zone_interventions = [];
    this.interventionZones.forEach((zone: MapLocation, index: number) => {
      value.zone_interventions.push({
        name: this.form.get('interventionZonesAlt')?.value[index] || zone.name,
        longitude: zone.longitude,
        latitude: zone.latitude
      })
    });

    value.osccategoriesOdd = []
    this.categories.forEach((category: Category, index: number) => {
      value.osccategoriesOdd.push({
        id: category.id,
        description: this.form.get('categories')?.value[index],
      });
    });

    value.telephone = value.dialCode + value.telephone;

    delete value.siege_alt;
    delete value.dialCode;
    delete value.interventionZones;
    delete value.interventionZonesAlt;
    delete value.categories;

    this.loading = true;
    this.oscService.create(value).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (osc: Osc) => this.dialogRef.close(osc),
      error: (error: any) => {
        this.errors = error?.error?.data;
        console.log(this.errors)
        Object.keys(this.errors).forEach((key: string) => {
          const formControl = this.form.get(key);
          if (formControl && this.errors[key].contains('required')) {
             formControl.setErrors({'required': true});
             formControl.markAllAsTouched();
          }
        })
      }
    });
  }

  onNext() {
    const newStep = this.steps.find((step: Step) => this.selectedStep.position + 1 === step.position);

    if (newStep) {
      this.selectedStep = newStep;
    }

    if (newStep?.position === 2) {
      setTimeout(() => {
        this.initMap();
      }, 500);
    }

    if (newStep?.position === 3 && this.odds.length === 0) {
      this.getOdds();
    }

    if (newStep?.position === 4) {
      this.initCategoriesForm();
    }
  }

  onPrevious() {
    const previousStep = this.steps.find((step: Step) => this.selectedStep.position - 1 === step.position);

    if (previousStep) {
      this.selectedStep = previousStep;
    }

    if (previousStep?.position === 2) {
      setTimeout(() => {
        this.initMap();
      }, 500);
    }
  }

  addSocialNetwork() {
    if (this.availableSocialNetworks.length > 0) {
      this.usedSocialNetworks.push(this.availableSocialNetworks[0]);
      this.availableSocialNetworks = this.availableSocialNetworks.filter((item: string) => item !== this.availableSocialNetworks[0]);
    }
  }

  removeSocialNetwork(network: string) {
    this.usedSocialNetworks = this.usedSocialNetworks.filter((item: string) => item !== network);
    this.availableSocialNetworks.push(network);
    this.availableSocialNetworks.sort();
  }

  private initMap(): void {
    const controls = new Collection<Control>();
    const markerLayer: VectorLayer<VectorSource> = new VectorLayer({
      source: this.markerSource
    });
    this.view = new View({
      projection: 'EPSG:900913',
      center: this.center,
      zoom: 1,
    });
    this.map = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM({})
        }),
        markerLayer
      ],
      target: 'location-selector',
      view: this.view,
      controls: controls,
    });

    this.map.on('click', (event: any) => {
      const coordinates = this.map?.getCoordinateFromPixel(event.pixel);
      if (coordinates) {
        this.placeService.reverse(toLonLat(coordinates)).subscribe((location: MapLocation|null) => {
          this.onPlaceSelected(location);
          this.removeHeadquarters();
          this.setHeadquarters();
        });
      }
    });
  }

  onPlaceSelected(place: MapLocation|null) {
    this.selectedLocation = place;
    if (this.map) {
      if (this.selectedLocation) {
        const extent: any = applyTransform(this.selectedLocation.bbox, getTransform("EPSG:4326", "EPSG:3857"));
        this.map.getView().fit(extent);
        this.map.getView().setZoom(8);
      } else {
        this.map.getView().setZoom(1);
      }
    }
  }

  setHeadquarters(): void {
    if (this.selectedLocation) {
      this.form.get('longitude')?.setValue(this.selectedLocation.longitude);
      this.form.get('latitude')?.setValue(this.selectedLocation.latitude);
      this.form.get('siege')?.setValue(this.selectedLocation.name);
      this.addMarker(this.selectedLocation, LocationTypes.HEADQUARTERS);
    } else {
      this.form.get('siege')?.setValue('');
    }
  }

  removeHeadquarters(): void {
    if (this.form.get('siege')) {
      this.removeMarker(`${this.form.get('siege')?.value}-${LocationTypes.HEADQUARTERS}`);
    }
    this.form.get('longitude')?.setValue('');
    this.form.get('latitude')?.setValue('');
    this.form.get('siege')?.setValue('');
  }

  addInterventionZone(): void {
    const added = this.interventionZones.find((zone: MapLocation) => {
      return this.selectedLocation?.latitude === zone.latitude && this.selectedLocation?.longitude === zone.longitude
    }) !== undefined;
    if (this.selectedLocation && !added) {
      const interventionZones = this.form.get('interventionZones') as FormArray;
      const interventionZonesAlt = this.form.get('interventionZonesAlt') as FormArray;
      this.interventionZones.push(this.selectedLocation);
      interventionZones.push(new FormControl({value: this.selectedLocation.name, disabled: true}));
      interventionZonesAlt.push(new FormControl(''));
      this.addMarker(this.selectedLocation, LocationTypes.INTERVENTION_ZONE);
    }
  }

  removeInterventionZone(zone: MapLocation, index: number): void {
    const interventionZones = this.form.get('interventionZones') as FormArray;
    const interventionZonesAlt = this.form.get('interventionZonesAlt') as FormArray;
    this.interventionZones.splice(index, 1);
    interventionZones.removeAt(index);
    interventionZonesAlt.removeAt(index);
    this.removeMarker(`${zone.name}-${LocationTypes.INTERVENTION_ZONE}`);
  }

  getFormArrayControl(controlName: string, index: number): FormControl {
    const array = this.form.get(controlName) as FormArray;

    return array.at(index) as FormControl;
  }

  addMarker(place: MapLocation, type: number): void {
    let src = '/assets/icons/map/marker-star.png';
    if (type === LocationTypes.INTERVENTION_ZONE) {
      src = '/assets/icons/map/marker-default.png';
    }

    const iconFeature = new Feature({
      name: place.name,
      geometry: new Point(fromLonLat([place.longitude, place.latitude])),
    });
    const markerStyle: Style = new Style({
      image: new Icon({
        src,
      })
    });
    iconFeature.setStyle(markerStyle);
    this.markerSource.addFeature(iconFeature);
    this.markerMap.set(`${place.name}-${type}`, iconFeature);
  }

  removeMarker(name: string): void {
    const feature = this.markerMap.get(name);
    if (feature) {
      this.markerSource.removeFeature(feature);
    }

    this.markerMap.delete(name);
  }

  getOdds(): void {
    this.loading = true;
    this.oddService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe((odds: Odd[]) => {
      this.odds = odds;
    });
  }

  onCategoriesSelection(categories: Category[], odd: Odd): void {
    // Remove categories that were already added and that are not in the new emitted value
    for (let [key, value] of this.categoriesMap) {
      if (value.id_odd === odd.id && categories.find((cat: Category) => cat.id === value.id) === undefined) {
        this.categoriesMap.delete(key);
      }
    }

    // Add new emitted categories
    categories.forEach((category: Category) => {
      this.categoriesMap.set(category.id, category);
    });
  }

  hasCategoriesSelected(odd: Odd): boolean {
    for (let [key, value] of this.categoriesMap) {
      if (odd.id === value.id_odd) return true;
    }

    return false;
  }

  onCountrySelected(name: string){
    const country = this.countries.find((country: Country) => country.name === name);
    if (country) {
      this.form.get('dialCode')?.setValue(country.dialCode);
    }
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.form.get(field);
    return formControl && formControl.errors && formControl.touched && formControl.errors[error];
  }

  private initCategoriesForm(): void {
    const categoriesControls = this.form.get('categories') as FormArray;
    categoriesControls.clear();
    this.categories = [];

    for (let [key, value] of this.categoriesMap) {
      this.categories.push(value);
      categoriesControls.push(new FormControl('', [Validators.required]))
    }
  }
}
