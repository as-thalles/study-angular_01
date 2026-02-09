import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { HousingService } from '../housing.service';
import { HousingLocationInfo } from '../housinglocation';

@Component({
    selector: 'app-details',
    imports: [ReactiveFormsModule],
    templateUrl: `./details.html`,
    styleUrls: ['details.css'],
})
export class Details {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);
    housingService = inject(HousingService);

    route: ActivatedRoute = inject(ActivatedRoute);
    housingLocationId = -1;

    housingLocation: HousingLocationInfo | undefined;

    applicationForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
    })

    constructor() {
        this.housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
        this.housingService.getHousingLocationById(this.housingLocationId)
            .then((housingLocation) => {
                this.housingLocation = housingLocation;
                this.changeDetectorRef.markForCheck();
            });
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applicationForm.value.firstName ?? '',
            this.applicationForm.value.lastName ?? '',
            this.applicationForm.value.email ?? ''
        );
    }
}
