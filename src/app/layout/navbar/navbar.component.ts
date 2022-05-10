import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Coordinate } from 'ol/coordinate';
import { AuthService } from 'src/app/auth/auth.service';
import { OscFormComponent } from 'src/app/oscs/osc-form/osc-form.component';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { User } from 'src/app/users/user';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      link: '/',
      label: 'Découvrir',
      image: '/assets/icons/menu/discover.svg',
      activeImage: '/assets/icons/menu/discover-active.svg',
      active: false
    },
    {
      link: '/a-propos',
      label: 'À propos',
      image: '/assets/icons/menu/about.svg',
      activeImage: '/assets/icons/menu/about-active.svg',
      active: false
    },
    {
      link: '/partenaires',
      label: 'Partenaires',
      image: '/assets/icons/menu/partners.svg',
      activeImage: '/assets/icons/menu/partners-active.svg',
      active: false
    },
    {
      link: '/chiffres',
      label: 'Chiffres',
      image: '/assets/icons/menu/numbers.svg',
      activeImage: '/assets/icons/menu/numbers-active.svg',
      active: false
    }
  ];
  sidebarVisible = false;
  user?: User;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private i18n: TranslateService,
    private auth: AuthService,
    private dialogService: DialogService,
  ) {
    this.subscribeToRouteEvents();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  subscribeToRouteEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.menuItems.forEach(item => {
          if (item.link === '/') {
            item.active = event.url.startsWith('/?odd=');
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
    this.auth.logout().subscribe(() => {
      this.auth.clearSession();
      window.location.href = '/';
    });
  }

  onAdd(): void {
    this.dialogService.open(OscFormComponent, {
      data: {
        title: this.i18n.instant('title.register')
      }
    }).afterClosed().subscribe(result => {});
    this.changeDetector.detectChanges();
  }
}
