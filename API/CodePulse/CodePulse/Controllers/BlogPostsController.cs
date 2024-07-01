using Azure.Core;
using CodePulse.Models.Domain;
using CodePulse.Models.DTO;
using CodePulse.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Validations;

namespace CodePulse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogpostRepository blogpostRepository;
        private readonly ICategoryRepository categoryRepository;

        public BlogPostsController(IBlogpostRepository _blogpostRepository, ICategoryRepository categoryRepository)
        {
            this.blogpostRepository = _blogpostRepository;
            this.categoryRepository = categoryRepository;
        }

        public IBlogpostRepository BlogpostRepository { get; }

        // post : {apibaseurl}/api/blogposts

        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto request)
        {
            //convert DTo to Domain
            var blogpost = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                Publisheddate = request.Publisheddate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = new List<Category>()
            };

            foreach(var category in request.Categories)
            {
                var existingCategory = await categoryRepository.GetById(category);
                if (existingCategory != null)
                {
                    blogpost.Categories.Add(existingCategory);
                }

            }


           blogpost =  await blogpostRepository.CreateAsync(blogpost);

            //comvert the Domain model to DTO

            var response = new BlogPostDto
            {
                Id = blogpost.Id,
                Author = request.Author,
                FeaturedImageUrl = request.FeaturedImageUrl,
                Content = request.Content,
                IsVisible = request.IsVisible,
                Publisheddate = request.Publisheddate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = blogpost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);
            
            
        }

        //Get: {apibaseurl}/api/blogposts
        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
          var result =  await blogpostRepository.GetAllAsync();

            // convert to DTo 

            var response = new List<BlogPostDto>();
            foreach (var blogpost in result)
            {
                response.Add(new BlogPostDto
                {
                    Id = blogpost.Id,
                    Author = blogpost.Author,
                    FeaturedImageUrl = blogpost.FeaturedImageUrl,
                    Content = blogpost.Content,
                    IsVisible = blogpost.IsVisible,
                    Publisheddate = blogpost.Publisheddate,
                    ShortDescription = blogpost.ShortDescription,
                    Title = blogpost.Title,
                    UrlHandle = blogpost.UrlHandle,
                    Categories = blogpost.Categories.Select(x => new CategoryDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle
                    }).ToList()
                });
             
            }    

            if(response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        // GET:  {apibaseurl}/api/blogposts/{id}

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetBlogPostbyId([FromRoute] Guid id)
        {
            //Get the Blogpost from Repo

            var blogpost = await blogpostRepository.GetBlogPostByIDAsync(id);
            if(blogpost == null)
            {
                return NotFound();
            }

            var response = new BlogPostDto
            {
                Id = blogpost.Id,
                Author = blogpost.Author,
                FeaturedImageUrl = blogpost.FeaturedImageUrl,
                Content = blogpost.Content,
                IsVisible = blogpost.IsVisible,
                Publisheddate = blogpost.Publisheddate,
                ShortDescription = blogpost.ShortDescription,
                Title = blogpost.Title,
                UrlHandle = blogpost.UrlHandle,
                Categories = blogpost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }


        [HttpGet]
        [Route("{urlHandle}")]
        public async Task<IActionResult> GetBlogPostByUrlHandle([FromRoute] string urlHandle)
        {
            // get blogpost details from repository 
            var blogpost =  await blogpostRepository.GetBlogPostByUrlAsync(urlHandle);
            if (blogpost == null)
            {
                return NotFound();
            }

            var response = new BlogPostDto
            {
                Id = blogpost.Id,
                Author = blogpost.Author,
                FeaturedImageUrl = blogpost.FeaturedImageUrl,
                Content = blogpost.Content,
                IsVisible = blogpost.IsVisible,
                Publisheddate = blogpost.Publisheddate,
                ShortDescription = blogpost.ShortDescription,
                Title = blogpost.Title,
                UrlHandle = blogpost.UrlHandle,
                Categories = blogpost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }


        // GET:  {apibaseurl}/api/blogposts/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> updateBlogPostbyId([FromRoute] Guid id, UpdateBlogPostrequest request)
        {
            // from Dto to domain model

            var blogpost = new BlogPost
            
            {
                Id = id,
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                Publisheddate = request.Publisheddate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = new List<Category>()
            };

            // foreach loop

            foreach(var categoryGuid in request.Categories)
            {
             var existingCategory =    await categoryRepository.GetById(categoryGuid);
                if(existingCategory != null)
                {
                    blogpost.Categories.Add(existingCategory);
                }
            }

            // call the Repository to update the blogpost Domain model

             var updatedBlog = await blogpostRepository.UpdateAsync(blogpost); 
             
           if(updatedBlog == null)
            {
                return NotFound();

            }

            var response = new BlogPostDto
            {
                Id = blogpost.Id,
                Author = blogpost.Author,
                FeaturedImageUrl = blogpost.FeaturedImageUrl,
                Content = blogpost.Content,
                IsVisible = blogpost.IsVisible,
                Publisheddate = blogpost.Publisheddate,
                ShortDescription = blogpost.ShortDescription,
                Title = blogpost.Title,
                UrlHandle = blogpost.UrlHandle,
                Categories = blogpost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }


        // DELETE: {apibaseurl}/api/blogposts/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
           var deletedBlogPost =  await blogpostRepository.DeleteAsync(id);

            if(deletedBlogPost == null)
            {
                return NotFound();
            }

            // Convert Domain 

            var response = new BlogPostDto
            {
                Id = deletedBlogPost.Id,
                Author = deletedBlogPost.Author,
                FeaturedImageUrl = deletedBlogPost.FeaturedImageUrl,
                Content = deletedBlogPost.Content,
                IsVisible = deletedBlogPost.IsVisible,
                Publisheddate = deletedBlogPost.Publisheddate,
                ShortDescription = deletedBlogPost.ShortDescription,
                Title = deletedBlogPost.Title,
                UrlHandle = deletedBlogPost.UrlHandle,
            };
            return Ok(response);

        }


    }

}

