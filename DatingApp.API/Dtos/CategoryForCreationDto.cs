using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class CategoryForCreationDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile File { get; set; }
        public string Url { get; set; }
        
    }
}