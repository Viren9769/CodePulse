import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient, private cookieservice: CookieService) { }

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
   return  this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`, updatedBlogpost,{
    headers: {'Authorization': this.cookieservice.get('Authorization')}
  });
  }

  DeleteBlogPost(id: string) : Observable<BlogPost>
  {
   return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`,{
    headers: {'Authorization': this.cookieservice.get('Authorization')}
  });
  }

  getBlogPostbyurl(urlHandle: string): Observable<BlogPost>
  {
   return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }
}
