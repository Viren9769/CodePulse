import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogPost) :Observable<BlogPost> 
  {
   return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`, data)
  }

  getAllBlogPost() :Observable<BlogPost[]>
  {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostbyId(id: string): Observable<BlogPost>
  {
   return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  updateBlogPost(id: string, updatedBlogpost: UpdateBlogPost) : Observable<BlogPost>
  {
   return  this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`, updatedBlogpost);
  }

  DeleteBlogPost(id: string) : Observable<BlogPost>
  {
   return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostbyurl(urlHandle: string): Observable<BlogPost>
  {
   return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }
}
