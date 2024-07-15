import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Collection, Feature, Map as OlMap, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Control } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
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
import { Thematique } from 'src/app/thematiques/thematique';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { finalize } from 'rxjs';
import { Category } from 'src/app/thematiques/category';
import { InnovationService } from '../innovation.service';
import { Innovation } from '../innovation';
import { MessageService } from 'src/app/shared/messages/message.service';
import { StorageService } from 'src/app/core/storage/storage.service';

const enum LocationTypes {
  INTERVENTION_ZONE,
  HEADQUARTERS,
}

@Component({
  selector: 'app-innovation-form',
  templateUrl: './innovation-form.component.html',
})
export class InnovationFormComponent implements OnInit {
  @Input() center: Coordinate = [17.7578122, 11.5024338];
  view?: View;
  projection: Projection | null = null;
  map?: OlMap;
  markerSource: VectorSource = new VectorSource();
  markerMap: Map<string, Feature> = new Map();
  get steps(): Step[] {
    return [
      {
        position: 1,
        title: this.i18n.instant('title.information'),
      },
      {
        position: 2,
        title: this.i18n.instant('title.localization'),
      },
      {
        position: 3,
        title: this.i18n.instant('title.objectives'),
      },
      {
        position: 4,
        title: this.i18n.instant('title.details'),
      },
    ];
  }
  selectedStep: Step = this.steps[0];
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    abbreviation: new FormControl<string>('', [Validators.required]),
    pays: new FormControl<string>('', [Validators.required]),
    date_fondation: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', []),
    document_link: new FormControl<string>('', []),
    personne_contact: new FormControl<string>('', [Validators.required]),
    dialCode: new FormControl<string>('', [Validators.required]),
    telephone: new FormControl<string>('', [Validators.required]),
    email_innovation: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    site_web: new FormControl<string>('', []),
    reference: new FormControl<string>('', [Validators.required]),
    facebook: new FormControl<string>('', []),
    twitter: new FormControl<string>('', []),
    instagram: new FormControl<string>('', []),
    linkedin: new FormControl<string>('', []),
    longitude: new FormControl<string>('', [Validators.required]),
    latitude: new FormControl<string>('', [Validators.required]),
    siege: new FormControl<string>({ value: '', disabled: true }, [
      Validators.required,
    ]),
    siege_alt: new FormControl<string>('', []),
    interventionZones: new FormArray([], [Validators.required]),
    interventionZonesAlt: new FormArray([]),
    categories: new FormArray([]),
  });
  coordinatesForm: FormGroup = new FormGroup({
    longitude: new FormControl<string>('', [Validators.required]),
    latitude: new FormControl<string>('', [Validators.required]),
  });
  countries: Country[] = [];
  availableSocialNetworks: string[] = ['twitter', 'instagram', 'linkedin'];
  usedSocialNetworks: string[] = ['facebook'];
  selectedLocation: MapLocation | null = null;
  interventionZones: MapLocation[] = [];
  categoriesMap: Map<number, Category> = new Map();
  categories: Category[] = [];
  thematiques: Thematique[] = [];
  loading: boolean = false;
  categoryDescMaxLength: number = 400;
  errors: any = {};
  language: string | null = 'fr';

  constructor(
    private i18n: TranslateService,
    private dialogRef: DialogRef,
    private placeService: PlaceService,
    private thematiqueService: ThematiqueService,
    private storage: StorageService,
    private innovationService: InnovationService,
    private messageService: MessageService,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.placeService
      .getCountries()
      .subscribe((countries: Country[]) => (this.countries = countries));
    
    this.language = this.storage.getItem('language');
    console.log(this.language)
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    const value = this.form.getRawValue() as any;

    value.zone_intervention = [];
    this.interventionZones.forEach((zone: MapLocation, index: number) => {
      value.zone_intervention.push({
        name: this.form.get('interventionZonesAlt')?.value[index] || zone.name,
        longitude: zone.longitude,
        latitude: zone.latitude,
      });
    });

    value.innovationcategoriesThematique = [];
    this.categories.forEach((category: Category, index: number) => {
      value.innovationcategoriesThematique.push({
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
    this.innovationService
      .create(value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (innovation: Innovation) => {
          this.dialogRef.close(innovation);
          if (this.language === "fr") {
            this.messageService.addMessage(
              'success',
              'INNOVATION Soumise avec succès',
              "Merci d'avoir soumis votre organisation. Les informations vont maintenant être contrôlées et vous serez prévenus lorsque l'organisation sera ajoutée à la carte."
            );
          } else {
            this.messageService.addMessage(
              'success',
              'INNOVATION Successfully submitted',
              "Thank you for submitting your organisation. The information will now be checked and you will be notified when the organisation is added to the map."
            );
          }
          
        },
        error: (error: any) => {
          this.errors = error?.error?.data;
          Object.keys(this.errors).forEach((key: string) => {
            const formControl = this.form.get(key);
            if (
              formControl &&
              Object.keys(this.errors).find((key: string) => key === 'required')
            ) {
              formControl.setErrors({ required: true });
              formControl.markAllAsTouched();
            }
          });
        },
      });
  }

  onNext() {
    const newStep = this.steps.find(
      (step: Step) => this.selectedStep.position + 1 === step.position
    );

    if (newStep) {
      this.selectedStep = newStep;
    }

    if (newStep?.position === 2) {
      setTimeout(() => {
        this.initMap();
      }, 500);
    }

    if (newStep?.position === 3 && this.thematiques.length === 0) {
      this.getThematiques();
    }

    if (newStep?.position === 4) {
      this.initCategoriesForm();
    }
  }

  onPrevious() {
    const previousStep = this.steps.find(
      (step: Step) => this.selectedStep.position - 1 === step.position
    );

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
      this.availableSocialNetworks = this.availableSocialNetworks.filter(
        (item: string) => item !== this.availableSocialNetworks[0]
      );
    }
  }

  removeSocialNetwork(network: string) {
    this.usedSocialNetworks = this.usedSocialNetworks.filter(
      (item: string) => item !== network
    );
    this.availableSocialNetworks.push(network);
    this.availableSocialNetworks.sort();
  }

  private initMap(): void {
    const controls = new Collection<Control>();
    const markerLayer: VectorLayer<VectorSource> = new VectorLayer({
      source: this.markerSource,
    });
    this.view = new View({
      projection: 'EPSG:900913',
      center: this.center,
      zoom: 1,
    });
    this.map = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM({}),
        }),
        markerLayer,
      ],
      target: 'location-selector',
      view: this.view,
      controls: controls,
    });

    this.map.on('click', (event: any) => {
      const coordinates = this.map?.getCoordinateFromPixel(event.pixel);
      if (coordinates) {
        this.findPlaceByCoordinates(coordinates, true);
      }
    });
  }

  onPlaceSelected(place: MapLocation | null) {
    this.selectedLocation = place;
    if (this.map) {
      if (this.selectedLocation) {
        const extent: any = this.selectedLocation.bbox;
        this.map.getView().fit(extent);
        this.map.getView().setZoom(8);
        this.coordinatesForm.setValue({
          longitude: this.selectedLocation.longitude,
          latitude: this.selectedLocation.latitude,
        });
      } else {
        this.map.getView().setZoom(1);
      }
    }
  }

  setHeadquarters(): void {
    if (this.selectedLocation) {
      this.form
        .get('longitude')
        ?.setValue(this.selectedLocation.longitude.toString());
      this.form
        .get('latitude')
        ?.setValue(this.selectedLocation.latitude.toString());
      this.form.get('siege')?.setValue(this.selectedLocation.name);
      this.addMarker(this.selectedLocation, LocationTypes.HEADQUARTERS);
    } else {
      this.form.get('siege')?.setValue('');
    }
  }

  removeHeadquarters(): void {
    if (this.form.get('siege')) {
      this.removeMarker(
        `${this.form.get('siege')?.value}-${LocationTypes.HEADQUARTERS}`
      );
    }
    this.form.get('longitude')?.setValue('');
    this.form.get('latitude')?.setValue('');
    this.form.get('siege')?.setValue('');
  }

  addInterventionZone(): void {
    const added =
      this.interventionZones.find((zone: MapLocation) => {
        return (
          this.selectedLocation?.latitude === zone.latitude &&
          this.selectedLocation?.longitude === zone.longitude
        );
      }) !== undefined;
    if (this.selectedLocation && !added) {
      const interventionZones = this.form.get('interventionZones') as FormArray;
      const interventionZonesAlt = this.form.get(
        'interventionZonesAlt'
      ) as FormArray;
      this.interventionZones.push(this.selectedLocation);
      interventionZones.push(
        new FormControl({ value: this.selectedLocation.name, disabled: true })
      );
      interventionZonesAlt.push(new FormControl(''));
      this.addMarker(this.selectedLocation, LocationTypes.INTERVENTION_ZONE);
    }
  }

  removeInterventionZone(zone: MapLocation, index: number): void {
    const interventionZones = this.form.get('interventionZones') as FormArray;
    const interventionZonesAlt = this.form.get(
      'interventionZonesAlt'
    ) as FormArray;
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
      geometry: new Point([place.longitude, place.latitude]),
    });
    const markerStyle: Style = new Style({
      image: new Icon({
        src,
      }),
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

  getThematiques(): void {
    this.loading = true;
    this.thematiqueService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((thematiques: Thematique[]) => {
        this.thematiques = thematiques;
      });
  }

  onCategoriesSelection(categories: Category[], thematique: Thematique): void {
    // Remove categories that were already added and that are not in the new emitted value
    for (let [key, value] of this.categoriesMap) {
      if (
        value.id_thematique === thematique.id &&
        categories.find((cat: Category) => cat.id === value.id) === undefined
      ) {
        this.categoriesMap.delete(key);
      }
    }

    // Add new emitted categories
    categories.forEach((category: Category) => {
      this.categoriesMap.set(category.id, category);
    });
  }

  hasCategoriesSelected(thematique: Thematique): boolean {
    for (let [key, value] of this.categoriesMap) {
      if (thematique.id === value.id_thematique) return true;
    }

    return false;
  }

  onCountrySelected(name: string) {
    const country = this.countries.find(
      (country: Country) => country.name === name
    );
    if (country) {
      this.form.get('dialCode')?.setValue(country.dialCode);
    }
  }

  onFindPlaceByCoordinates(): void {
    const value = this.coordinatesForm.value;
    if (value.longitude && value.latitude) {
      const coordinates = [value.longitude, value.latitude];
      this.findPlaceByCoordinates(coordinates);
    }
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.form.get(field);
    return (
      formControl &&
      formControl.errors &&
      formControl.touched &&
      formControl.errors[error]
    );
  }

  private initCategoriesForm(): void {
    const categoriesControls = this.form.get('categories') as FormArray;
    categoriesControls.clear();
    this.categories = [];

    for (let [key, value] of this.categoriesMap) {
      this.categories.push(value);
      categoriesControls.push(
        new FormControl<string>('', [Validators.required])
      );
    }
  }

  private findPlaceByCoordinates(
    coordinates: Coordinate,
    isHeadquarters: boolean = false
  ): void {
    this.loading = true;
    this.placeService
      .reverse(coordinates)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((location: MapLocation | null) => {
        this.onPlaceSelected(location);
        if (isHeadquarters) {
          this.removeHeadquarters();
          this.setHeadquarters();
        }
      });
  }

  isValid(): boolean {
    if (this.selectedStep.position === 1) {
      if (
        this.field('name')?.valid &&
        this.field('abbreviation')?.valid &&
        this.field('pays')?.valid &&
        this.field('date_fondation')?.valid &&
        this.field('description')?.valid &&
        this.field('personne_contact')?.valid &&
        this.field('dialCode')?.valid &&
        this.field('telephone')?.valid &&
        this.field('reference')?.valid &&
        this.field('email_innovation')?.valid &&
        this.field('document_link')?.valid
      ) {
        return true;
      }

      return false;
    }

    if (this.selectedStep.position === 2) {
      return Boolean(
        this.form.get('siege')?.value &&
          this.form.get('interventionZones')?.value.length !== 0
      );
    }

    return true;
  }

  field(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
