import {Component, Input} from '@angular/core';
import {CountryService} from 'src/app/core/service/country.service';

@Component({
  selector: 'app-informations-jo',
  templateUrl: './informations-jo.component.html',
  styleUrl: './informations-jo.component.css',
  providers: [CountryService],
})
export class InformationsJoComponent {
  @Input() nbJos: number
  @Input() nbCountries: number;

  constructor() {
  }

}
