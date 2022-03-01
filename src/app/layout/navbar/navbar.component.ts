import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
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

  constructor(private router: Router) {
    this.subscribeToRouteEvents();
  }

  subscribeToRouteEvents(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.menuItems.forEach(item => {
          item.active = item.link === event.url;
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
}
