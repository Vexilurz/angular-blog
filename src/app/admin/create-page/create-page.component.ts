import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private postsService: PostsService
  ) { 
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      text: new FormControl('', [
        Validators.required,
      ]),
      author: new FormControl('', [
        Validators.required,
      ])
    })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) return;

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
    })
  }

}
