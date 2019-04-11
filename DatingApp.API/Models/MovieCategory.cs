using System.Collections.Generic;

namespace DatingApp.API.Models
{
    public class MovieCategory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public ICollection<Movie> Movies { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}