import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../core/service/country.service";
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [CountryService],

})
export class HomePageComponent implements OnInit {
  countries: any[] = [];
  nbJos: number;
  nbCountries: number;
  single: any[] = [];
  view: any[] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private countryService: CountryService, private router: Router) {
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      this.single = data.map(country => ({
        value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
        name: country.country,
      }));
      console.log('Single:', this.single);
      this.nbJos = data[0].participations.length
      this.nbCountries = data.length;
    });
  }

  onSelect(data): void {
    const findCountry = this.countries.find(country => country.country === data.name)
    if (findCountry) {
      this.router.navigate(['/details', findCountry.id])
    }
  }

  onResize($event: any) {
    this.view = [$event.target.innerWidth, 600];
  }
}
