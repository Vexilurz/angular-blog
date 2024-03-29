import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription
  dSub!: Subscription; 
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { 
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string | undefined) {
    if (id) {
      this.dSub = this.postsService.remove(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alert.warning('Post deleted')
      })
    }
  }
  
  ngOnInit(): void {    
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
