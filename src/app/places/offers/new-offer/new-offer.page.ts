import { AuthService } from './../../../auth/auth.service';
import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(private placesService: PlacesService,
              private authService: AuthService,
              private router: Router,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onOfferCreate() {
    if (!this.form.valid) {
      return;
    }

    const loading = this.loadingController.create({
      message: 'please wait..',
      duration: 2000
    }).then(loadingEl => loadingEl.present()
    );

    setTimeout(() => {
      this.placesService.addPlace(
        this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo),
        this.authService.getUserId()
      );
      this.form.reset();
      this.router.navigateByUrl('/places/tabs/offers');
  
    }, 2000);
  }

  datesValid() {
    const start = new Date(this.form.value.dateFrom);
    const end = new Date(this.form.value.dateTo);
    return end > start;
  }


}
