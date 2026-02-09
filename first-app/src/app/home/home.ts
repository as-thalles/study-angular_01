import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { HousingLocation } from "../housing-location/housing-location";
import { HousingLocationInfo } from "../housinglocation";
import { HousingService } from "../housing.service"

@Component({
    selector: 'app-home',
    imports: [HousingLocation, FormsModule],
    templateUrl: `./home.html`,
    styleUrls: ['./home.css'],
})
export class Home {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);
    housingService: HousingService = inject(HousingService);

    housingLocationList: HousingLocationInfo[] = [];
    filteredHousingLocationList: HousingLocationInfo[] = this.housingLocationList;

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
        this.filteredHousingLocationList = this.housingLocationList.filter(
            (housingLocation) => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        )
    }
}
