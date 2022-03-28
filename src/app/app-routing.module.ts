import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
