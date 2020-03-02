import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  placesSub: Subscription;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private router: Router,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('placeId')) {
          this.router.navigate(['/', 'places', 'tabs', 'offers']);
          return;
        }
        this.placesSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
          this.place = place;

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
        });
      }
      );
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingController.create({
      message: 'Updating place..'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService.editPlace(this.place.id, this.form.value.title, this.form.value.description).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/places/tabs/offers');
      });
    });
    console.log('offer edited', this.form);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
