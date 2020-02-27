import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onModalClose() {
    this.modalController.dismiss(null, 'cancel');
  }

  onModalSubmit() {
    this.modalController.dismiss({message: 'Modal submitted', selectedPlace: this.selectedPlace}, 'confirm');
  }

}
