namespace DatingApp.API.Dtos
{
    public class MovieForMovieDbSearch
    {
        public string Backdrop_Path { get; set; }
        public int id { get; set; }
        public string Title { get; set; }
        public string Overview { get; set; }
        public string Poster_Path { get; set; }
        public string Release_Date { get; set; }
    }
}