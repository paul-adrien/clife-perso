import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  template: `
  <main class="container my-5" role="main" style="margin-bottom: 150px">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4">
          <div class="card">
            <img src="../../assets/img/temp.png" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">Température</h5>
              <p class="card-text">Carte intéractive de l'évolution climatique en frances et de son impact sur les répartiteurs Orange</p>
              <a routerLink="/temperature" class="btn btn-primary">Voir</a>
            </div>
          </div>
      </div>
    </div>
  </main>
`,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
}
