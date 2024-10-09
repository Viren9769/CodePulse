using CodePulse.Models.Domain;

namespace CodePulse.Repository.Interface
{
    public interface IBlogpostRepository
    {
       Task<BlogPost> CreateAsync(BlogPost blogPost); 
       Task<IEnumerable<BlogPost>> GetAllAsync();

       Task<BlogPost?> GetBlogPostByIDAsync(Guid id);

      Task<BlogPost?> UpdateAsync(BlogPost blogPost);

       Task<BlogPost?> DeleteAsync(Guid id);

        Task<BlogPost?> GetBlogPostByUrlAsync(string urlHandle);
    }
}
