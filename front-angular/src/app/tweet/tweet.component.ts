import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tweet',
  template: `
  <div style="margin: 15px">
    <form
      [formGroup]="twitterForm"
      class="form-container"
      name="form"
      (ngSubmit)="f.form.valid && getTweet()"
      #f="ngForm"
      novalidate
    >
      <div class="row">
        <div class="col" style="margin: 15px">
          <div class="row">
            <label for="keyWord1" class="col-sm-2 col-form-label">Mot clé 1</label>
            <div class="col-sm-10">
              <input
              style="max-width: 300px;"
              formControlName="keyWord1"
              id="keyWord1"
              type="text"
              class="form-control"
              placeholder="Mot clé 1"/>
            </div>
          </div>
        </div>
        <div class="col" style="margin: 15px">
          <div class="row">
            <label for="keyWord2" class="col-sm-2 col-form-label">Mot clé 2</label>
            <div class="col-sm-10">
              <input
              style="max-width: 300px;"
              formControlName="keyWord2"
              id="keyWord2"
              type="text"
              class="form-control "
              placeholder="Mot clé 2">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col" style="margin: 15px">
          <div class="row">
            <label for="count" class="col-sm-2 col-form-label">Nombre de tweet</label>
            <div class="col-sm-10">
              <input
              style="max-width: 200px;"
              formControlName="count"
              id="count"
              type="number"
              class="form-control"
              placeholder="Nombre de tweet">
            </div>
          </div>
        </div>
        <div class="col position-relative">
          <button type="button" class="btn btn-primary btn-lg position-absolute top-50 start-50" (click)="getTweet()">Envoyer</button>
        </div>
      </div>
    </form>
  </div>
  <div *ngIf="tweets"  style="margin-bottom: 80px">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Tweet</th>
          <th scope="col">Localisation</th>
          <th scope="col">Heure</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let tweet of tweets">
          <th>{{tweet.full_text}}</th>
          <td>{{tweet.user.location}}</td>
          <td>{{tweet.created_at}}</td>
        </tr>
      </tbody>
    </table>
  </div>
`,
  styleUrls: ['./tweet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetComponent implements OnInit {
  public tweets = [];

  public twitterForm: FormGroup = new FormGroup({
    keyWord1: new FormControl(''),
    keyWord2: new FormControl(''),
    count: new FormControl(10)
  });

  constructor(private tweetService: TweetService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  getTweet() {
    const form = this.twitterForm.getRawValue();
    this.tweetService.getTweet(form.keyWord1, form.keyWord2, form.count).subscribe(data => {
      console.log(data);
      this.tweets = data.data.statuses;
      this.cd.detectChanges();
    })
  }

}
