import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { PostService } from './post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http-request-project'; 
   loadedPosts: Post[]= [];
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.postService.FetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // call CreateAndStorePost from PostService.
    this.postService.CreateAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.postService.FetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
