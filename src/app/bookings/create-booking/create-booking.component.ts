import { BookingsService } from './../bookings.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', {static: true}) form: NgForm;
  startDate: Date;
  endDate: Date;

  constructor(private modalController: ModalController,
              private bookingsService: BookingsService) { }

  ngOnInit() {
    this.startDate = new Date(this.selectedPlace.availableFrom);
    this.endDate = new Date(this.selectedPlace.availableTo);
  }

  onModalClose() {
    this.modalController.dismiss(null, 'cancel');
  }


  onModalSubmit() {
    if (!this.form.valid || !this.datesValid()) {
      return;
    }

    this.modalController.dismiss(
      { bookingData:
        {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: this.form.value['guest-number'],
          dateFrom: new Date(this.form.value['date-from']),
          dateTo: new Date(this.form.value['date-to'])
        }
      }, 'confirm'
    );

  }

  datesValid() {
    const start = new Date(this.form.value['date-from']);
    const end = new Date(this.form.value['date-to']);
    return end > start;
  }
}
