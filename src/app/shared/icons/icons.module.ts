import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  HeroArrowRight,
  HeroCheck,
  HeroChevronDown,
  HeroChevronUp,
  HeroGlobeAlt,
  HeroInformationCircleSolid,
  HeroLocationMarkerSolid,
  HeroMailSolid,
  HeroMenu,
  HeroPhoneSolid,
  HeroPlus,
  HeroSearch,
  HeroUserSolid,
  HeroX
} from '@ng-icons/heroicons';
import { IonLogoFacebook, IonLogoTwitter, IonLogoInstagram, IonLogoLinkedin } from '@ng-icons/ionicons';
import { FeatherPlusSquare, FeatherMinusSquare } from '@ng-icons/feather-icons';



@NgModule({
  exports: [NgIconsModule],
  imports: [
    NgIconsModule.withIcons({
      FeatherMinusSquare,
      FeatherPlusSquare,
      IonLogoFacebook,
      IonLogoTwitter,
      IonLogoInstagram,
      IonLogoLinkedin,
      HeroArrowRight,
      HeroCheck,
      HeroChevronDown,
      HeroChevronUp,
      HeroGlobeAlt,
      HeroInformationCircleSolid,
      HeroLocationMarkerSolid,
      HeroMailSolid,
      HeroMenu,
      HeroPhoneSolid,
      HeroPlus,
      HeroSearch,
      HeroUserSolid,
      HeroX
    }),
  ]
})
export class IconsModule { }
