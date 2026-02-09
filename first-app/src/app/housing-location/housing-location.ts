import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

import { HousingLocationInfo } from "../housinglocation";

@Component({
    selector: 'app-housing-location',
    templateUrl: `./housing-location.html`,
    styleUrls: ["./housing-location.css"],
    imports: [RouterLink]
})
export class HousingLocation {
    housingLocation = input.required<HousingLocationInfo>();
}
