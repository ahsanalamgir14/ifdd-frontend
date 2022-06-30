import { Component } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
})
export class PartnersComponent {
  partners: any[] = [
    {
      logo: '/assets/logos/national.png',
      name: 'À propos du Forum Mondial des organes consultatifs nationaux sur les ODD :',
      about:
        "Le Forum Mondial est un réseau qui relie les connaissances et l'expérience des commissions consultatives multipartites, des conseils et des organes similaires pour le développement durable. Ces organes contribuent aux architectures institutionnelles nationales pour la mise en œuvre des objectifs de développement durable (ODD). En rapprochant les connaissances et les intérêts des différents groupes de parties prenantes, les organes consultatifs multipartites favorisent l'acceptation sociale et la cohésion de la société en période de transformation. La demande pour leur travail de facilitation des résultats des négociations ne peut être sous-estimée. Ce forum pour et par les organes consultatifs multipartites nationaux est aussi hétérogène que les contextes respectifs de ses membres, qui varient en conséquence dans leur développement institutionnel, leur mise en place, leur mandat et leur rôle. Les échanges constants au sein des groupes de travail et entre eux créent un riche marché d'idées, de mécanismes de négociation et de mesures politiques efficaces qui peuvent facilement être transférés et adaptés aux besoins et aux demandes locales ailleurs. En tant que réseau axé sur la demande, il évolue constamment dans les processus collectifs. Grâce à son riche réservoir de connaissances collectives, le forum invite efficacement les parties prenantes et les gouvernements du monde entier à adapter, mettre en œuvre et accélérer conjointement la réalisation de l'Agenda 2030 et des ODD.",
      website: 'http://www.sdg-advisorybodies.net/',
    },
    {
      logo: '/assets/logos/ifdd.svg',
      name: 'L’Institut de la Francophonie pour le Développement Durable',
      about:
        'L’Institut de la Francophonie pour le développement durable (IFDD) est un organe subsidiaire de l’Organisation internationale de la Francophonie (OIF) et son siège est à Québec. À l’origine dénommé Institut de l’Énergie des Pays ayant en commun l’usage du Français (IEPF), l’IFDD est né en 1988 peu après le IIe Sommet de la Francophonie, tenu à Québec en 1987. Sa création fait suite aux crises énergétiques mondiales et à la volonté des chefs d’États et de gouvernements des pays francophones de conduire une action concertée pour soutenir le développement du secteur de l’énergie dans les pays membres. En 1996, l’Institut inscrit les résolutions du Sommet de la Terre de Rio-1992 comme fil directeur de son action et devient l’Institut de l’énergie et de l’environnement de la Francophonie. En 2013, à la suite de la Conférence de Rio+20, il prend la dénomination Institut de la Francophonie pour le développement durable (IFDD). Sa mission est de contribuer à : •	la formation et au renforcement des capacités des acteurs de développement des pays de l’espace francophone dans les secteurs de l’énergie et de l’environnement ; •	l’accompagnement d’initiatives relatives à l’élaboration et à la mise en œuvre des programmes de développement durable ; •	la promotion de l’approche développement durable dans l’espace francophone ; •	et au développement de partenariats dans les différents secteurs de développement économique et social, notamment l’environnement et l’énergie. L’action de l’IFDD s’inscrit dans le Cadre stratégique de la Francophonie, au sein de la mission D « Développement durable, économie et solidarité » et de l’objectif stratégique 7 « Contribuer à l’élaboration et à la mise en œuvre du Programme de développement pour l’après-2015 et des Objectifs du développement durable ». L’Institut est chef de file des quatre programmes suivants de la programmation 2019-2022 de l’OIF, mis en œuvre en partenariat avec d’autres unités de l’organisation : - Francophonie, décennie d’action pour le développement durable, - Accès aux services énergétiques modernes en Francophonie,- Francophonie, environnement et résilience climatique, - Initiative de la Francophonie pour le Bassin du Congo.',
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
