using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/search/movies")]
    [ApiController]
    public class MovieAPIController: ControllerBase
    {
    private readonly IHttpClientFactory _clientFactory;

    public MovieAPIController(IHttpClientFactory clientFactory)
        {
      _clientFactory = clientFactory;
    }

    [HttpGet("s={name}")]
    public async Task<IActionResult> GetMoviesFromMovieDb(string name) {
      
      var client = _clientFactory.CreateClient();
    
      // var response = await client.GetAsync($"http://www.omdbapi.com/?s={name}&apikey=948cea94");
      var response = await client.GetAsync($"https://api.themoviedb.org/3/search/movie?api_key=3650d864e76977abd467fdc82290d485&query={name}");
      
      if (response.IsSuccessStatusCode) {
        var moviesDb = await response.Content.ReadAsAsync<MovieDbSearchResults>();
        foreach(MovieForMovieDbSearch movie in moviesDb.Results) {
          var path = movie.Poster_Path;
          movie.Poster_Path = $"http://image.tmdb.org/t/p/w500{path}";
        }
        return Ok(moviesDb.Results);
        
      } else {
        return BadRequest();
      }
      
    }
    [HttpGet("i={imdbId}")]
    public async Task<IActionResult> GetMovieFromOmdb(string imdbId) {
      var client = _clientFactory.CreateClient();
      // var response = await client.GetAsync($"https://api.themoviedb.org/3/movie/{id}?api_key=3650d864e76977abd467fdc82290d485&language=en-US")
      var response = await client.GetAsync($"http://www.omdbapi.com/?i={imdbId}&apikey=948cea94");

      if (response.IsSuccessStatusCode) {
          var movieFromOmdb = await response.Content.ReadAsAsync<MovieForSearchById>();
          return Ok(movieFromOmdb);
      } else {
        return BadRequest();
      }
    }
  }
}