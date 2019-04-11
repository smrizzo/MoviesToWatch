using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class CategoryForUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Photo photo { get; set; }
    }
}