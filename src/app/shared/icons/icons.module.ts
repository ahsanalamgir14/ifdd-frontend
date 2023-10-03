import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowRightSolid,
  heroBars3Solid,
  heroCheckSolid,
  heroChevronDownSolid,
  heroChevronUpSolid,
  heroGlobeAmericasSolid,
  heroGlobeAltSolid,
  heroInformationCircleSolid,
  heroMapPinSolid,
  heroEnvelopeSolid,
  heroMegaphoneSolid,
  heroPhoneSolid,
  heroPlusSolid,
  heroMagnifyingGlassSolid,
  heroShareSolid,
  heroLanguageSolid,
  heroUserSolid,
  heroXMarkSolid,
} from '@ng-icons/heroicons/solid';
import {
  ionLogoFacebook,
  ionLogoTwitter,
  ionLogoInstagram,
  ionLogoLinkedin,
  ionMail,
  ionCall,
} from '@ng-icons/ionicons';
import { featherPlusSquare, featherMinusSquare } from '@ng-icons/feather-icons';

@NgModule({
  exports: [NgIconsModule],
  imports: [
    NgIconsModule.withIcons({
      heroArrowRightSolid,
      heroBars3Solid,
      heroCheckSolid,
      heroChevronDownSolid,
      heroChevronUpSolid,
      heroGlobeAmericasSolid,
      heroGlobeAltSolid,
      heroInformationCircleSolid,
      heroMapPinSolid,
      heroEnvelopeSolid,
      heroMegaphoneSolid,
      heroPhoneSolid,
      heroPlusSolid,
      heroMagnifyingGlassSolid,
      heroShareSolid,
      heroLanguageSolid,
      heroUserSolid,
      heroXMarkSolid,
      ionLogoFacebook,
      ionLogoTwitter,
      ionLogoInstagram,
      ionLogoLinkedin,
      ionMail,
      ionCall,
      featherPlusSquare,
      featherMinusSquare,
    }),
  ],
})
export class IconsModule {}
