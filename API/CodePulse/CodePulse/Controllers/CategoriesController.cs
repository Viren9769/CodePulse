using CodePulse.Data;
using CodePulse.Models.Domain;
using CodePulse.Models.DTO;
using CodePulse.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.Controllers
{
    // https://localhost:xxxx/api/categories

    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
       // private readonly AplicationDbContext dbContext;
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this._categoryRepository = categoryRepository;
        }

        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            // Map DTO to domain Model

            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };

            await _categoryRepository.CreateAsync(category);

            //Domain model to DTO

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);

           
        }

        //GET all the categories
        // https://localhost:44320/api/Categories
        [HttpGet]
        
        public async Task<IActionResult> GetAllCategories()
        {
          var cat =  await _categoryRepository.GetAllAsync();

            // Map domain model through DTO
            var response = new List<CategoryDto>();
            foreach (var category in cat)
            {
                response.Add(new CategoryDto
                { 
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }

            return Ok(response);
        }


        // Get categories by ID 

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById( [FromRoute] Guid id)
        {
            var existingCategory = await _categoryRepository.GetById(id);

            if(existingCategory is null)
            {
                return NotFound();
            }
           var response = new CategoryDto 
           {
               Id = existingCategory.Id,
               Name = existingCategory.Name,
               UrlHandle = existingCategory.UrlHandle,
           };
            return Ok(response);

        }

        // this will be a put method

        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Editcategory([FromRoute] Guid id, [FromBody] UpdateCategoryrequestDto request)
        {
            // Convert Dto to Domain model

            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

          category =  await _categoryRepository.UpdateAsync(category);
            if(category is null)
            {
                return NotFound();
            }

            // Convert the domain model to dto

            var response = new CategoryDto { Id = category.Id, Name = category.Name, UrlHandle = category.UrlHandle };
            return Ok(response);

        }

        //this will be the delete method 

        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]

        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
           var  category =  await _categoryRepository.DeleteAysnc(id);
            if(category is null)
            {
                return NotFound();
            }

            //convert Domain model to DTo

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);
        }

    }
}
