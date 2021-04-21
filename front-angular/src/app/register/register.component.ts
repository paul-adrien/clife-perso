import { Component, OnInit } from '@angular/core';
import { User } from 'libs/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth_service';

@Component({
  selector: 'app-register',
  template: `
  <main class="container-lg" role="main" style="margin-bottom: 150px" >
    <h1 style="margin-top: 3%;">Créer votre compte</h1>
    <div class="row">
      <div class="col-sm-6">
        <form
        name="form"
        (ngSubmit)="f.form.valid && onSubmit()"
        #f="ngForm"
        novalidate>
          <div class="form-group">
            <label for="Name" class="is-required">Nom</label>
            <input type="text" class="form-control" name="userName"
            [(ngModel)]="form.lastName"
            required
            #lastName="ngModel"
            placeholder="Nom">
          </div>
            <div class="form-group has-warning">
            <label for="Prenom" class="is-required">Prénom</label>
            <input type="text" class="form-control"
            name="FirstName"
            [(ngModel)]="form.firstName"
            required
            #firstName="ngModel"
            placeholder="Prénom">
          </div>
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
            <span class="form-text small text-muted" id="helpTextPassword">Minimum six characters with one lowercase, one uppercase and a number.</span>
          </div>
          <div class="form-group my-3">
            <button type="submit" class="btn btn-secondary">Soumettre</button>
          </div>
        </form>
      </div>
    </div>
  </main>
`,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: Partial<User> = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        if (data.status === true) {
          this.route.navigate(["/login"]);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
