import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as Constant from '../app.constants';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Authorization' : JSON.parse(localStorage.getItem('user')).body['accessToken']
  })
};
@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  constructor(private http: HttpClient) { }
  createArticle(payload) {
     console.log(payload, httpOptions.headers);
    return this.http.post(Constant.BACKEND_API_ROOT_URL+Constant.ARTICLE_URL,payload,httpOptions);
  }
  getArticleList(pageId) {
    console.log(localStorage.getItem('user'));
    return this.http.get(Constant.BACKEND_API_ROOT_URL+Constant.ARTICLE_URL + '?pageId=' + pageId,httpOptions);
  }
  updateArticle(payload) {
    console.log(payload);
    return this.http.put(Constant.BACKEND_API_ROOT_URL+Constant.ARTICLE_URL+ '/'+payload.id,payload,httpOptions);

  }
  deleteArticle(payload) {
    return this.http.delete(Constant.BACKEND_API_ROOT_URL+Constant.ARTICLE_URL+'/'+payload._id,httpOptions);
    
  }
}
