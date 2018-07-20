import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCdKeyService {
  constructor(private http: HttpClient) {}

  validateKey(key: string) {
    return this.http
      .post('/authenticateKey', { key })
      .toPromise()
      .catch((err: any) => {
        console.log('FUCK OFF');
        console.log(err);
        return Promise.reject(err);
      });
  }
}
