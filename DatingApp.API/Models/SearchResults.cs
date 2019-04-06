using System.Collections.Generic;
using DatingApp.API.Dtos;

namespace DatingApp.API.Models
{
    public class SearchResults
    {
        public bool Response { get; set; }
        public List<MovieForSearchList> Search { get; set; }
        public int TotalResults { get; set; }
    }
}