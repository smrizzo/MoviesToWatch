namespace DatingApp.API.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Poster_path { get; set; }
        public string Title { get; set; }
        public string Overview { get; set; }
        public string Homepage { get; set; } = null;
        public string Year { get; set; }
        public string Release_date { get; set; }
        public int Runtime { get; set; }
        public string imdb_id { get; set; }
        public int MovieId { get; set; }
        public double Vote_average { get; set; }
        public double Rating { get; set; }
        public bool Watched { get; set; } = false;
        public string Trailer_url { get; set; }
        public MovieCategory MovieCategory { get; set; }
        public int MovieCategoryId { get; set; }

       
    }
}