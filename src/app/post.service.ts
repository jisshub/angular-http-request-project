import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // instance for Subject
  errObject = new Subject<string>();
  constructor(private http: HttpClient) { }

  CreateAndStorePost(postData: Post){
    this.http.post("https://test-angular-fire-project.firebaseio.com/posts.json", postData, {
      headers: new HttpHeaders({"Custom-Header": "Hello"})
    })
    .subscribe(responseData => {
       console.log(responseData);
    }, error => {
        this.errObject.next(error.message);      
    })
  }
  FetchPosts(){
    return this.http.get("https://test-angular-fire-project.firebaseio.com/posts.json", {headers: new HttpHeaders({"Custom-Header": "Hello"})})
    .pipe(map(data => {
        const dataArray: Array<Object> = [];
        for (const key in data) {
          dataArray.push({...data[key], id: key})
        }
        return dataArray;
    }),
    catchError(errRes => {
      return throwError(errRes);
    }));
  }
  // delete posts
  DeletePosts(){
    return this.http.delete("https://test-angular-fire-project.firebaseio.com/posts.json")
  }
}
