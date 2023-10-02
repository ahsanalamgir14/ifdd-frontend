import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';
import { I18nResolver } from './core/i18n/i18n.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { i18nReady: I18nResolver },
    children: [
      {
        path: '',
        component: BaseLayoutComponent,
        children: [
          {
            path: '',
            component: DiscoverComponent,
          },
        ],
      },
      {
        path: '',
        component: PageLayoutComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
