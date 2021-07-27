import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription

  constructor(
    private postsService: PostsService
  ) { 
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string | undefined) {
    if (id) {
      
    }
  }
  
  ngOnInit(): void {    
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

}
