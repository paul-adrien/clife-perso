import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as risquesData from '../../assets/fichierTest.json';
import { environment } from 'src/environments/environment';

const AUTH_API = '';

@Injectable({
  providedIn: 'root'
})
export class temperaturesService {
  risquesData: any = (risquesData as any).default;

  constructor(private http: HttpClient) { }


}
