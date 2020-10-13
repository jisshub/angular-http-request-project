import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { PostService } from './post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-http-request-project'; 
  loadedPosts: Object[]= [];
  error = null;
  private errSub: Subscription
  constructor(private http: HttpClient, private postService: PostService) {}
  ngOnInit() {
    //  subscribe to errSub property 
    this.errSub = this.postService.errObject.subscribe(errMsg => {
        this.error = errMsg;
    })
    this.postService.FetchPosts().subscribe(posts => {
      console.log(posts);
      // assign posts to empty array loadedPosts
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
      console.log(error);
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
  ngOnDestroy(){
    // unsubscribe 
    this.errSub.unsubscribe();
  }
}
