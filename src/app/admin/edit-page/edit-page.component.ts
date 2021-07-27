import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form!: FormGroup  

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { 
    
  }

  submit() {

  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.postsService.getById(params['id'])
    })).subscribe((post: Post) => {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

}
