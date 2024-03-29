import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbCreateResponse, Post } from '../admin/shared/interfaces';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(
    private http: HttpClient
  ) { }
  
  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          const newPost: Post = {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
          return newPost;
        })
      )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: {[key: string]: any}) => {          
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        })
      )
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          const newPost: Post = {
            ...post,
            id,
            date: new Date(post.date)
          };
          return newPost;
        })
      )
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}