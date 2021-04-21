import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as risquesData from '../../assets/fichierTest.json';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class temperaturesService {
    risquesData: any = (risquesData as any).default;

  constructor(private http: HttpClient) { }
  
    
}
