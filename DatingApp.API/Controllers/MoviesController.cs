using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [Route("api/users/{userId}/movies")]
  [ApiController]
  public class MoviesController : ControllerBase
  {
    private readonly IMovieRepository _repo;
    private readonly IMapper _mapper;
    private readonly IHttpClientFactory _clientFactory;

    public MoviesController(IMovieRepository repo, IMapper mapper, IHttpClientFactory clientFactory)
    {
      _clientFactory = clientFactory;
      _mapper = mapper;
      _repo = repo;

    }

    [HttpGet]
    public async Task<IActionResult> GetMovieCategories([FromQuery]UserParams userParams) {
      var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      userParams.UserId = currentUserId;
      Console.WriteLine("CURRENT USER ID" + currentUserId);
      var movieCategories = await _repo.GetCategories(userParams);

      var categoriesToReturn = _mapper.Map<IEnumerable<CategoryForListDto>>(movieCategories);
      Response.AddPagination(movieCategories.CurrentPage, movieCategories.PageSize,
      movieCategories.TotalCount, movieCategories.TotalPages);
  
      return Ok(categoriesToReturn);
    }

    [HttpGet("m={id}", Name = "GetMovie")]
    public async Task<IActionResult> GetMovie(int id)
    {

      var movieFromRepo = await _repo.GetMovie(id);
      var movie = _mapper.Map<MovieForReturnDto>(movieFromRepo);
      return Ok(movie);
    }

    [HttpGet("c={id}", Name="GetMovieCategory")]
    public async Task<IActionResult> GetMovieCategory(int id) {
      var categoryFromRepo = await _repo.GetMovieCategory(id);
      var movieCategory = _mapper.Map<CategoryForReturnDto>(categoryFromRepo);
      return Ok(movieCategory);
    }

    [HttpPost("c={categoryId}/m={movieId}")]
    public async Task<IActionResult> AddMovieForCategory(int userId, int categoryId, string movieId)
    {
      if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
          return Unauthorized();
      }

      var client = _clientFactory.CreateClient();
      var response = await client.GetAsync($"https://api.themoviedb.org/3/movie/{movieId}?api_key=3650d864e76977abd467fdc82290d485&language=en-US");
      
      if (response.IsSuccessStatusCode){
        var movieFromMovieDb = await response.Content.ReadAsAsync<MovieForCreationDto>();
        Console.WriteLine("MOVIE FROM MOVIE DB ID:---------- " + movieFromMovieDb.imdb_id);
        var categoryFromRepo = await _repo.GetMovieCategory(categoryId);
        Console.WriteLine("CATEGORY ID--------------" + categoryId);
        Console.WriteLine("CATEGORY FROM REPO-------" + categoryFromRepo.Title);

        var movie = _mapper.Map<Movie>(movieFromMovieDb);
        Console.WriteLine("MOVIE FROM  MOVIEID:-------------- " + movie.Id);
      
        //adds movie to category in database
        categoryFromRepo.Movies.Add(movie);

        if (await _repo.SaveAll()) {
          var movieToReturn = _mapper.Map<MovieForReturnDto>(movie);
          return CreatedAtRoute("GetMovie", new { id = movie.Id }, movieToReturn);
        }
        return BadRequest("Could not add the movie");

      } else{
        return BadRequest("Was not able to get movie from movieDb");
      }
    }

    [HttpPost("addCategory")]
    public async Task<IActionResult> AddCategoryForUser(int userId, CategoryForCreationDto categoryForCreationDto) {
      if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
          return Unauthorized();
      }
      Console.WriteLine("userID------------------------" + userId);
      Console.WriteLine("CATEGORY FOR CREATION DTO-----" + categoryForCreationDto.Title + "----" + categoryForCreationDto.Description);
      var userFromRepo = await _repo.GetUser(userId);
      var movieCategory = _mapper.Map<MovieCategory>(categoryForCreationDto);
      userFromRepo.MovieCategories.Add(movieCategory);

      if(await _repo.SaveAll()) {
        var categoryToReturn = _mapper.Map<CategoryForReturnDto>(movieCategory);
        return CreatedAtRoute("GetMovieCategory", new { id = movieCategory.Id }, categoryToReturn);
      }
      return BadRequest("Could not add the category");

    }










  }
}