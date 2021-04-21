import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../libs/user';
import { AuthService } from '../services/auth_service';

@Component({
  selector: 'app-login',
  template: `
  <main class="container-lg" role="main" style="margin-bottom: 150px">
    <h1 style="margin-top: 3%;">Connexion</h1>
    <div class="row">
      <div class="col-sm-6">
          <h3 style="color: #f16e00">Content de vous revoir</h3>
          <form name="form"
          (ngSubmit)="f.form.valid && onSubmit()"
          #f="ngForm"
          novalidate>
            <div class="form-group">
              <label for="Email" class="is-required">Email</label>
              <input type="email" class="form-control" name="email"
              [(ngModel)]="form.email"
              required
              email
              #email="ngModel"
              placeholder="Email">
            </div>
            <div class="form-group">
              <label for="Password" class="is-required">Mot de passe</label>
              <input type="password" class="form-control"
              name="password"
              [(ngModel)]="form.password"
              required
              minlength="6"
              #password="ngModel">
            </div>
              <a style="font-weight: bold;">Mot de passe oublié</a>
              <p style="margin-top: 3%">Merci de ne pas utiliser <strong>Internet Explorer</strong> mais plutôt <strong>Google Chrome</strong>, <strong>Mozilla Firefox</strong> ou <strong>Microsoft Edge</strong> !</p>
              <button type="submit" class="btn btn-primary" value="sign_in">Connexion</button>
          </form>
      </div>
      <div class="col-sm-6">
          <h3 style="color: #f16e00">Première visite ?</h3>
          <h6>Veuillez compléter un court formulaire d'inscription pour créer un compte et obtenir l'accès à ce site.</h6>
          <a class="btn btn-secondary" routerLink="/register">Inscription</a>
      </div>
    </div>
  </main>
`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: Partial<User> = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, public route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data);
        if (data.status === true) {
          this.isLoginFailed = false;
          this.authService.saveToken(data.accessToken);
          this.authService.saveUser(data.user);
          this.route.navigate(["/home"]);
          //this.isLoggedIn = true;
          //window.location.reload();
        } else {
          this.errorMessage = data.message;
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
