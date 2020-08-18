import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // base api url
  public BaseApiUrl = 'http://localhost:8080';

  constructor(
    public httpclient: HttpClient
  ) { }

  // get method
  get(url, isJsonFile: boolean = false) {
    if (isJsonFile === false) {
      url = this.BaseApiUrl + url;
    }
    return this.httpclient.get(url).toPromise();
  }

  // post method
  post(url, params) {
    url = this.BaseApiUrl + url;
    return this.httpclient.post(url, params).toPromise();
  }

  // put method
  put(url, params) {
    url = this.BaseApiUrl + url;
    return this.httpclient.put(url, params).toPromise();
  }

  // delete method
  delete(url) {
    url = this.BaseApiUrl + url;
    return this.httpclient.delete(url).toPromise();
  }

}
