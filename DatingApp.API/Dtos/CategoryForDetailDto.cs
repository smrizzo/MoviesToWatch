using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class CategoryForDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
    }
}