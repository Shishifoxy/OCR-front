import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CountryService } from './core/service/country.service';
import { DiagrammeCirculaireComponent } from './components/diagramme-circulaire/diagramme-circulaire.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InformationsJoComponent } from './components/informations-jo/informations-jo.component';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DiagrammeCirculaireComponent,
    DetailsPageComponent,
    InformationsJoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    NgxChartsModule,

  ],
  providers: [
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
