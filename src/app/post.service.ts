import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // instance for Subject
  errObject = new Subject<string>();
  constructor(private http: HttpClient) { }

  CreateAndStorePost(postData: Post){
    this.http.post("https://test-angular-fire-project.firebaseio.com/posts.json", postData)
    .subscribe(responseData => {
       console.log(responseData);
    }, error => {
        this.errObject.next(error.message);      
    })
  }
  FetchPosts(){
    return this.http.get("https://test-angular-fire-project.firebaseio.com/posts.json")
    .pipe(map(data => {
        const dataArray: Array<Object> = [];
        for (const key in data) {
          dataArray.push({...data[key], id: key})
        }
        return dataArray;
    }));
  }
  // delete posts
  DeletePosts(){
    return this.http.delete("https://test-angular-fire-project.firebaseio.com/posts.json")
  }
}
