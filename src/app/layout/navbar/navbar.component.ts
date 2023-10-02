import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MapService } from 'src/app/map/map.service';
import { OscFormComponent } from 'src/app/oscs/osc-form/osc-form.component';
import { MapLocation } from 'src/app/places/map-location';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { User } from 'src/app/users/user';
import { MenuItem } from './menu-item';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import { TermsComponent } from 'src/app/shared/terms/terms.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      link: '/',
      label: 'Découvrir',
      image: '/assets/icons/menu/discover.svg',
      activeImage: '/assets/icons/menu/discover-active.svg',
      active: false,
    },
    {
      link: '/a-propos',
      label: 'À propos',
      image: '/assets/icons/menu/about.svg',
      activeImage: '/assets/icons/menu/about-active.svg',
      active: false,
    },
    {
      link: '/partenaires',
      label: 'Partenaires',
      image: '/assets/icons/menu/partners.svg',
      activeImage: '/assets/icons/menu/partners-active.svg',
      active: false,
    },
    {
      link: '/chiffres',
      label: 'Chiffres',
      image: '/assets/icons/menu/numbers.svg',
      activeImage: '/assets/icons/menu/numbers-active.svg',
      active: false,
    },
  ];
  language: string;
  sidebarVisible = false;
  user?: User;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private i18n: I18nService,
    private auth: AuthService,
    private dialogService: DialogService,
    private mapService: MapService
  ) {
    this.language = this.i18n.getLanguage();
    this.subscribeToRouteEvents();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  subscribeToRouteEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.menuItems.forEach((item) => {
          if (item.link === '/') {
            item.active =
              event.url.startsWith('/?odd=') ||
              event.url.startsWith('/?oscId') ||
              item.link === event.url;
          } else {
            item.active = item.link === event.url;
          }
        });
      }
    });
  }

  openSidebar(): void {
    this.sidebarVisible = true;
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
  }

  logout(): void {
    this.auth.clearSession();
    window.location.href = '/';
    this.auth.logout().subscribe(() => {
      window.location.href = '/';
    });
  }

  onAdd(): void {
    this.dialogService
      .open(OscFormComponent, {
        data: {
          title: this.i18n.instant('title.register'),
        },
      })
      .afterClosed()
      .subscribe((result) => {});
    this.changeDetector.detectChanges();
  }

  onPlaceSelected(place: MapLocation | null): void {
    this.mapService.selectLocation(place);
  }

  changeLanguage(language: string): void {
    this.i18n.changeLanguage(language);
  }

  showTerms(): void {
    this.dialogService.open(TermsComponent);
  }
}
