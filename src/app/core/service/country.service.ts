import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../interface/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'assets/olympic.json';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getMedalsData(): Observable<any[]> {
    return this.getCountries().pipe(
      map((countries) => {
        const formattedData = countries.map((country) => ({
          y: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
          name: country.country,
        }));
        console.log('Formatted Data:', formattedData);
        return formattedData;
      })
    );
  }
  getMedalsByCountry(countryName: string): Observable<any[]> {
    return this.getCountries().pipe(
      map((countries) => {
        const selectedCountry = countries.find((country) => country.country === countryName);

        if (selectedCountry) {
          return selectedCountry.participations.map((participation) => ({
            year: participation.year,
            medalsCount: participation.medalsCount,
          }));
        } else {
          return [];
        }
      })
    );
  }

}
