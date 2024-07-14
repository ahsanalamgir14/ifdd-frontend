import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnovationComponent } from './innovation/innovation.component';
import { ThematiquesModule } from '../thematiques/thematiques.module';
import { InnovationDetailsComponent } from './innovation-details/innovation-details.component';
import { SharedModule } from '../shared/shared.module';
import { InnovationFormComponent } from './innovation-form/innovation-form.component';
import { PlacesModule } from '../places/places.module';


@NgModule({
  declarations: [
    InnovationComponent,
    InnovationDetailsComponent,
    InnovationFormComponent
  ],
  exports: [
    InnovationComponent,
    InnovationDetailsComponent,
    InnovationFormComponent
  ],
  imports: [
    CommonModule,
    ThematiquesModule,
    SharedModule,
    PlacesModule,
  ]
})
export class InnovationsModule { }
