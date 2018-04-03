import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSoapModule } from 'ngx-soap';
import { SopaService } from './sopaservice.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DepositarComponent } from './depositar/depositar.component';
import { RetirarComponent } from './retirar/retirar.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CrearComponent } from './crear/crear.component';


const appRoutes: Routes = [
  { path: 'crear', component: CrearComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'retirar', component: RetirarComponent },
  { path: 'depositar', component: DepositarComponent },
  { path: '', redirectTo: '/crear', pathMatch: 'full' },
  { path: '**', redirectTo: '/crear', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    DepositarComponent,
    RetirarComponent,
    BuscarComponent,
    CrearComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgxSoapModule,
    FormsModule
  ],
  providers: [
    SopaService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
