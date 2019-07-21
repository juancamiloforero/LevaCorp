import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreferenciasPage } from './preferencias.page';

const routes: Routes = [
  {
    path: '',
    component: PreferenciasPage
  },
  {
    path: 'crear',
    loadChildren: './crear/crear.module#CrearPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreferenciasPage]
})
export class PreferenciasPageModule {}