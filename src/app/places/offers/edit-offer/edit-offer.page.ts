import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.router.navigate(['/', 'places', 'tabs', 'offers']);
          return;
        }
        this.place = this.placesService.getPlace(paramMap.get('placeId'));
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });
      }
      );
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log('offer edited', this.form);
  }

}
