import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http-request-project'; 
   loadedPosts: Post[]= [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post("https://test-angular-fire-project.firebaseio.com/posts.json", postData)
    .subscribe(responseData => {
     console.log(responseData);            
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  // create a private method
  private fetchPosts() {

       this.http.get("https://test-angular-fire-project.firebaseio.com/posts.json")
       .pipe(map(data =>{
          // converting js object to array of objects.
          // first initialize an empty array
          const postsArray: Post[] = [];
          // loop each object in data
          for (const key in data) {
            // push each item as new object to empty array
            postsArray.push({...data[key], id: key})
          }          
          return postsArray;
       }))
       .subscribe(posts => {
         this.loadedPosts = posts;
         
       })
  }
}
