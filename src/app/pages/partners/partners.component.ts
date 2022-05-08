import { Component } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
})
export class PartnersComponent {
  partners: any[] = [
    {
      logo: '/assets/logos/ifdd.svg',
      name: 'L’Institut de la Francophonie pour le Développement Durable',
      about:
        'L’Institut de la Francophonie pour le développement durable (IFDD) est un organe subsidiaire de l’Organisation internationale de la Francophonie (OIF) et son siège est à Québec.À l’origine dénommé Institut de l’Énergie des Pays ayant en commun l’usage du Français (IEPF), l’IFDD est né en 1988 peu après le IIe Sommet de la Francophonie, tenu à Québec en 1987. Sa création fait suite aux crises énergétiques mondiales et à la volonté des chefs d’États et de gouvernements des pays francophones de conduire une action concertée pour soutenir le développement du secteur de l’énergie dans les pays membres. En 1996, l’Institut inscrit les résolutions du Sommet de la Terre de Rio-1992 comme fil directeur de son action et devient l’Institut de l’énergie et de l’environnement de la Francophonie. En 2013, à la suite de la Conférence de Rio+20, il prend la dénomination Institut de la Francophonie pour le développement durable (IFDD). ',
      website: 'https://www.ifdd.francophonie.org/',
    },
    {
      logo: '/assets/logos/oif.svg',
      name: 'L’Organisation Internationale de la Francophonie',
      about:
        'L’Organisation internationale de la Francophonie (OIF) est une institution fondée sur le partage d’une langue, le français, et de valeurs communes. Elle rassemble 88 États et gouvernements. Le rapport sur la langue française dans le monde, publié en 2018, établit à 300 millions le nombre de locuteurs de français. Présente sur les cinq continents, l’OIF mène des actions politiques et de coopération dans les domaines prioritaires suivants : la langue française et la diversité culturelle et linguistique ; la paix, la démocratie et les droits de l’Homme ; l’éducation et la formation ; le développement durable et la solidarité. Dans l’ensemble de ses actions, l’OIF accorde une attention particulière aux jeunes et aux femmes, ainsi qu’à l’accès aux technologies de l’information et de la communication.La secrétaire générale conduit l’action politique de la Francophonie, dont elle est la porteparole et la représentante officielle au niveau international. Louise Mushikiwabo a été élue à ce poste lors du XVIIe Sommet de la Francophonie, en octobre 2018, à Erevan (Arménie).Mme Mushikiwabo a pris ses fonctions en janvier 2019.',
      website: 'https://www.francophonie.org/',
    },
  ];
  constructor() {}
}
