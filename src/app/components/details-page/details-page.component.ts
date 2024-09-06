import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/core/service/country.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  countryName: string;
  countryId: number;
  medalsData: any[] = []
  view: any[] = [700, 400];
  xAxisLabel: string = 'Année';
  yAxisLabel: string = 'Nombre de médailles';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  scaleType: string = 'linear';
  legend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxis = true;
  yAxis = true;
  nbparticipations: number;
nbMedals: number;
nbAthlete: number;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) { }

  onResize($event: any) {
    this.view = [$event.target.innerWidth/1.5, 400];
  }

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.paramMap.get('id');
    console.log('countryId' + this.countryId)

    let countryName: string;
    this.countryService.getCountries().subscribe(countries => {
      const country = countries.find(c => c.id === this.countryId);
      if (country) {
        countryName = country.country;
      this.countryService.getMedalsByCountry(countryName).subscribe(data => {
        const participations = data.map(participation => ({
          name: participation.year,
          value: participation.medalsCount
        }));
        this.medalsData = [
          {
            name: countryName,
            series: participations
          }
        ];
        this.nbparticipations = countries.find(c => c.id === this.countryId).participations.length;
        this.nbMedals = countries.find(c => c.id === this.countryId).participations.reduce((total, participation) => total + participation.medalsCount, 0);
        this.nbAthlete = countries.find(c => c.id === this.countryId).participations.reduce((total, participation) => total + participation.athleteCount, 0);
        this.countryName = countryName;
        console.log('Medals Data:', this.medalsData);
        this.cdr.detectChanges();
      });
    }
      else {
        this.router.navigate(['/'])
      }
    });
  }
}
