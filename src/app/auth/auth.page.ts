import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  onLogIn() {
    this.loadingController.create({message: 'Loading...', spinner: 'circles'})
                          .then(loadingEl => {
                            loadingEl.present();
                            setTimeout(() => {
                              loadingEl.dismiss();
                              this.authService.logIn();
                              this.router.navigateByUrl('/places/tabs/discover');
                            }, 2500);
                          });

  }

}
