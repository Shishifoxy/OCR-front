import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../../core/service/country.service';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@Component({
  selector: 'app-diagramme-circulaire',
  templateUrl: './diagramme-circulaire.component.html',
  styleUrls: ['./diagramme-circulaire.component.css'],

})
export class DiagrammeCirculaireComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective; // Ajout de cette ligne
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets: any[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public nbCountries
  public nbJos

  constructor(private countryService: CountryService) {
  }

  ngOnInit() {
    this.countryService.getMedalsData().subscribe((data) => {
      console.log(data)
      this.pieChartLabels = data.map(entry => entry.name);
      this.pieChartDatasets = [{ data: data.map(entry => entry.y), label: 'Medals' }];
    });
  }
  getMedalData(data) {
    // TODO
  }
  ngAfterViewInit() {
  }

}
