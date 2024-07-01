using CodePulse.Models.Domain;
using CodePulse.Models.DTO;
using CodePulse.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;

        public ImagesController(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        




        // POST IMAGES: {apibaseurl}/api/images
        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string title)
        {
            ValidateFileUpload(file);
            if(ModelState.IsValid)
            {
                // File Uplaod

                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    FileName = fileName,
                    Title = title,
                    DateCreadted = DateTime.Now
                };
             blogImage =   await imageRepository.Upload(file, blogImage);

                //convert the Domain Model to dto

                var response = new BlogImageDto
                {
                    Id = blogImage.Id,
                    Title = blogImage.Title,
                    DateCreadted = blogImage.DateCreadted,
                    FileExtension = blogImage.FileExtension,
                    FileName = blogImage.FileName,
                    Url = blogImage.Url,
                };

                return Ok(blogImage);
            }

            return BadRequest(ModelState);
        }
        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtension = new string[] { ".jpg", ".jpeg", ".png" };
            if(!allowedExtension.Contains(Path.GetExtension(file.FileName.ToLower())))
            {
                ModelState.AddModelError("file", "unsupported file format");

            }
            if(file.Length > 10485760)
            {
                ModelState.AddModelError("file", "file size cannor be more than 10MB");
            }
        }

        //GET: {apiBaseUrl}/api/images
        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            // call image repository to get all images

            var images = await imageRepository.GetAll();

            // convert domain model to dto 

            var response = new List<BlogImageDto>();

            foreach(var image in images)
            {
                response.Add(new BlogImageDto
                {
                    Id = image.Id,
                    Title = image.Title,
                    DateCreadted = image.DateCreadted,
                    FileExtension = image.FileExtension,
                    FileName = image.FileName,
                    Url = image.Url
                });
            }
            return Ok(response);    

        }

    }
}
