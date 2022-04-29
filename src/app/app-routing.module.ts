import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: []
  },
  {
    path: '',
    component: PageLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
