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
   loadedPosts: Object[]= [];
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.postService.FetchPosts().subscribe(posts => {
      console.log(posts);
      // assign posts to empty array loadedPosts
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // call CreateAndStorePost from PostService.
    this.postService.CreateAndStorePost(postData);
  }

  onFetchPosts() {
    this.postService.FetchPosts().subscribe(posts => {
      console.log(posts);
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // subscribe here, clear the loadedPosts array
    this.postService.DeletePosts().subscribe(() => {
        this.loadedPosts= [];
    })
  }
}
