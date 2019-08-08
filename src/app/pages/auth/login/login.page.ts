import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Observable } from 'rxjs/Observable';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error = false;
  errorMessage: String = '';
  dataLoading = false;
  user = false;
  roles: any[];
  data: Observable<any>;
  private querySubscription;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      res => {
        if (res['data']['loginUser_Q'].token !== '') {
          window.localStorage.setItem(
            'token',
            res['data']['loginUser_Q'].token
          );
          const token = localStorage.getItem('token');
          this.user = true;
          this.error = false;
          this.errorMessage = '';
        } else {
          this.error = true;
          this.errorMessage = res['data']['loginUser_Q'].message;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }

}
