namespace DatingApp.API.Dtos
{
    public class MovieForSearchById
    {
        public string Title { get; set; }
        public string Poster { get; set; }
        public string Plot { get; set; }
        public string Runtime { get; set; }
        public string Website { get; set; }
        public int Year { get; set; }
        public string imdbId { get; set; }
        public double imdbRating{ get; set; }
        public string Released { get; set; }
        public string Rated { get; set; }
    }
}