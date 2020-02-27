import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent],
  // Since CreateBookingComponent is not used in routes or the dom-selectors,
  // it needs to be declared in entryComponents and also, declarations
  entryComponents: [CreateBookingComponent]
})
export class PlaceDetailPageModule {}
