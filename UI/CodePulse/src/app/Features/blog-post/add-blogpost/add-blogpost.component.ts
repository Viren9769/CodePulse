import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../Category/models/categorymodel';
import { ImageSelectorComponent } from "../../../shared/component/image-selector/image-selector.component";
import { ImageService } from '../../../shared/component/image-selector/image.service';

@Component({
    selector: 'app-add-blogpost',
    standalone: true,
    templateUrl: './add-blogpost.component.html',
    styleUrl: './add-blogpost.component.css',
    imports: [FormsModule, DatePipe, MarkdownModule, CommonModule, ImageSelectorComponent]
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

model: AddBlogPost;
categories$? : Observable<Category[]>;
isimageSelectorVisible : boolean = false;
imageselectorSubscription?: Subscription;
constructor(private blogpostservice: BlogPostService, private router : Router, private categoryservice: CategoryService, private imageservice: ImageService){
  this.model = {
    title: '',
    shortDescription: '',
    urlHandle:'',
    content:'',
    featuredImageUrl:'',
    author:'',
    isVisible:true,
    publishedDate: new Date(),
    categories: []
  }
}

  ngOnInit(): void {
   this.categories$ = this.categoryservice.getAllCategory();
 this.imageselectorSubscription =  this.imageservice.onSelectImage()
   .subscribe({
    next: (selectedImage) =>
      {
this.model.featuredImageUrl = selectedImage.url;
this.closeImageSelector();
      }
   })

  }

OnFormSubmit(): void {

  console.log(this.model);
  this.blogpostservice.createBlogPost(this.model).subscribe({
    next: (Response) =>
      {
        this.router.navigateByUrl('/admin/blogposts');
      }
   
  });
  }
  openImageSelector() :void{
     
    this.isimageSelectorVisible = true;

    }

    closeImageSelector() : void {
      this.isimageSelectorVisible = false;

      }
      ngOnDestroy(): void {
        this.imageselectorSubscription?.unsubscribe();
      }
}
