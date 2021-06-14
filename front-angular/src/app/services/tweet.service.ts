import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class TweetService {

    constructor(private http: HttpClient) { }

    getTweet(keyword1: string, keyword2: string, count: number): Observable<any> {
        return this.http.get(AUTH_API + `api/twitter/list?keyword1=${keyword1}&keyword2=${keyword2}&count=${count}`);
    }
}
