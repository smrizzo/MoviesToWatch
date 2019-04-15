using System.Collections.Generic;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class VideoFromMovieDbDto
    {
        public ICollection<VideoMovieDb> results { get; set; } = null;
    }
}