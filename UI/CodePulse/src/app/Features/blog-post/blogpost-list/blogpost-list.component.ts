import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {

blogPost$?: Observable<BlogPost[]>; 

  constructor(private serviceblog : BlogPostService){}

  ngOnInit(): void {
    // get all the blog post 
    this.blogPost$ =  this.serviceblog.getAllBlogPost();
      
  }

}
