import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscribable, Subscription, observable } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../Category/services/category.service';
import { Category } from '../../Category/models/categorymodel';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageSelectorComponent } from "../../../shared/component/image-selector/image-selector.component";
import { ImageService } from '../../../shared/component/image-selector/image.service';

@Component({
    selector: 'app-edit-blogpost',
    standalone: true,
    templateUrl: './edit-blogpost.component.html',
    styleUrl: './edit-blogpost.component.css',
    imports: [FormsModule, CommonModule, MarkdownModule, ImageSelectorComponent]
})
export class EditBlogpostComponent implements OnInit, OnDestroy {





  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedcategories?: string[];
  routeSubscription?: Subscription;
  updateblogSubscription?: Subscription;
  GetBlogPostSubscription?: Subscription;
  DeleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  isimageSelectorVisible : boolean = false;


constructor(private router: ActivatedRoute, 
   private blodpostservice: BlogPostService,
   private categoryservice: CategoryService,
   private route: Router,
  private imageservice: ImageService)
   {}
 


  ngOnInit(): void {

   this.categories$ = this.categoryservice.getAllCategory();
    
   this.routeSubscription =  this.router.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id');


        // Get blog post from API
        if(this.id)
          {
         this.GetBlogPostSubscription =   this.blodpostservice.getBlogPostbyId(this.id).subscribe({
              next: (Response) =>
                {
                  this.model = Response;
                  this.selectedcategories = Response.categories.map(x => x.id);
                }
            });
          }
        this.imageSelectSubscription =   this.imageservice.onSelectImage().subscribe({
            next: (Response) => {
              if(this.model)
                {
                  this.model.featuredImageUrl = Response.url;
                  this.isimageSelectorVisible = false;
                }
            }
          });
        


      }
    })

  }
  OnFormSubmit() {
    // first convert the model to  request object 
if(this.model && this.id)
  {
    var UpdateBlogPost: UpdateBlogPost = {
      author: this.model.author,
      content: this.model.content,
      shortDescription: this.model.shortDescription,
      featuredImageUrl: this.model.featuredImageUrl,
      isVisible: this.model.isVisible,
      publishedDate: this.model.publishedDate,
      title: this.model.title,
      urlHandle: this.model.urlHandle,
      categories: this.selectedcategories ?? []
    };

  this.updateblogSubscription =  this.blodpostservice.updateBlogPost(this.id, UpdateBlogPost).subscribe({
      next: (Response) => {
        this.route.navigateByUrl('/admin/blogposts');
      }
    })
  }
    }

    openImageSelector() :void{
     
      this.isimageSelectorVisible = true;

      }

      closeImageSelector() : void {
        this.isimageSelectorVisible = false;

        }


    onDelete(): void {
      if(this.id)
        {
 this.DeleteBlogPostSubscription =  this.blodpostservice.DeleteBlogPost(this.id).subscribe({
  next: (Response) => {
    this.route.navigateByUrl('/admin/blogposts');
  }
});
        }
      }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateblogSubscription?.unsubscribe();
    this.GetBlogPostSubscription?.unsubscribe();
    this.DeleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
