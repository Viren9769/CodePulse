using CodePulse.Data;
using CodePulse.Models.Domain;
using CodePulse.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CodePulse.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AplicationDbContext _context;
        public CategoryRepository(AplicationDbContext dbContext)
        {
            this._context = dbContext;
            
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> DeleteAysnc(Guid id)
        {
          var existiongcategory =  await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (existiongcategory is null)
            {
                return null;
            }
            _context.Categories.Remove(existiongcategory);
            await _context.SaveChangesAsync();
            return existiongcategory;

        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            //Query the database 
       //    var categories =  _context.Categories.AsQueryable();

            //filtering

          /*  if(string.IsNullOrWhiteSpace(query) == false)
            {
                categories = categories.Where(x => x.Name.Contains(query));
            }*/

            //sorting

            //pagination

            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {
          return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
           var exiastingcategory =  await _context.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);
            if(exiastingcategory != null)
            {
                _context.Entry(exiastingcategory).CurrentValues.SetValues(category);
                await _context.SaveChangesAsync();
                return category;

            }

            return null;
        }
    }
}
