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
    public async Task<IActionResult> GetMoviesFromOmdb(string name) {
      
      var client = _clientFactory.CreateClient();
      
      var response = await client.GetAsync($"http://www.omdbapi.com/?s={name}&apikey=948cea94");
      
      if (response.IsSuccessStatusCode)
      {
          var movies = await response.Content.ReadAsAsync<SearchResults>();
          return Ok(movies.Search);
      } else {
        return BadRequest();
      }
      
      
    }
    [HttpGet("i={imdbId}")]
    public async Task<IActionResult> GetMovieFromOmdb(string imdbId) {
      var client = _clientFactory.CreateClient();
      
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