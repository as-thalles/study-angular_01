import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { HousingLocation } from "../housing-location/housing-location";
import { HousingLocationInfo } from "../housinglocation";
import { Housing } from "../housing"
import {submit} from "@angular/forms/signals";

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value) ">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredHousingLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation" />
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  housingLocationList: HousingLocationInfo[] = [];
  filteredHousingLocationList: HousingLocationInfo[] = this.housingLocationList;
  housingService: Housing = inject(Housing);

  constructor() {
    this.housingService.getAllHousingLocations()
        .then((housinglocationList: HousingLocationInfo[]) => {
          this.housingLocationList = housinglocationList;
          this.filteredHousingLocationList = housinglocationList;
          this.changeDetectorRef.markForCheck();
        });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredHousingLocationList = this.housingLocationList;
      return;
    }
    this.filteredHousingLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    )
  }

  protected readonly submit = submit;
}
