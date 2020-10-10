import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http-request-project'; 
   loadedPosts = [];

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
       this.http.get("https://test-angular-fire-project.firebaseio.com/posts.json").subscribe(posts => {
         console.log(posts);
       })
  }
}
