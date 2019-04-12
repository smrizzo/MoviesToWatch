using System.Collections.Generic;
using DatingApp.API.Dtos;

namespace DatingApp.API.Models
{
    public class MovieDbSearchResults
    {
        public int Page { get; set; }
        public List<MovieForMovieDbSearch> Results { get; set; }
        public int Total_Pages { get; set; }
        public int total_results { get; set; }
    }
}