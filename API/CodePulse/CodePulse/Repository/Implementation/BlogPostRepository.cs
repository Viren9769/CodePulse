using CodePulse.Data;
using CodePulse.Models.Domain;
using CodePulse.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.Repository.Implementation
{
    public class BlogPostRepository : IBlogpostRepository
    {
        private readonly AplicationDbContext dbcontext;

        public BlogPostRepository(AplicationDbContext _dbcontext)
        {
            this.dbcontext = _dbcontext;
        }

        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await dbcontext.BlogPosts.AddAsync(blogPost);
            await dbcontext.SaveChangesAsync();
            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await dbcontext.BlogPosts.Include(x => x.Categories).ToListAsync();

        }

        public async Task<BlogPost?> GetBlogPostByIDAsync(Guid id)
        {
           return await dbcontext.BlogPosts.Include(x => x.Categories).SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
        {
            var existingBlogPost = await dbcontext.BlogPosts.Include(x => x.Categories)
                                         .FirstOrDefaultAsync(x => x.Id == blogPost.Id);
            if (existingBlogPost == null)
            {
                return null;
            }
            //update Blogpost
            dbcontext.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);

            //update categoruies

            existingBlogPost.Categories = blogPost.Categories;


            await dbcontext.SaveChangesAsync(); 
            return blogPost; 
        }
        public async Task<BlogPost?> DeleteAsync(Guid id)
        {
          var existingBlogPost =   await dbcontext.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);

            if(existingBlogPost != null) 
            {
                dbcontext.BlogPosts.Remove(existingBlogPost);
                await dbcontext.SaveChangesAsync();
                return existingBlogPost;
            }
            return null;
        }

        public async Task<BlogPost?> GetBlogPostByUrlAsync(string urlHandle)
        {
            return await dbcontext.BlogPosts.Include(x => x.Categories).SingleOrDefaultAsync(c => c.UrlHandle == urlHandle);
        }
    }
}
