using System;

namespace DatingApp.API.Dtos
{
    public class MovieForCreationDto
    {
        
        public string Poster_path { get; set; }
        public string Title { get; set; }
        public string Overview { get; set; }
        public string Homepage { get; set; } = null;
        public string Year { get; set; }
        public string Release_date { get; set; }
        public int Runtime { get; set; }
        public string imdb_id { get; set; }
    }
}