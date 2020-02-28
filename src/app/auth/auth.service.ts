import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticated = false;

  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  constructor() { }

  logIn() {
    this.userIsAuthenticated = true;
  }

  logOut() {
    this.userIsAuthenticated = false;
  }
}
