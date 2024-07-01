using CodePulse.Models.Domain;

namespace CodePulse.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<IEnumerable<Category>> GetAllAsync();

        Task<Category?> GetById(Guid id);

       Task<Category?> UpdateAsync(Category category);

        Task<Category?> DeleteAysnc(Guid id);
    }
}
