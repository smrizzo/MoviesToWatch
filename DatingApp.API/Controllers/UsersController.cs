using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [ServiceFilter(typeof(LogUserActivity))]
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly IDatingRepository _repo;
    private readonly IMapper _mapper;
    private readonly IMovieRepository _movieRepo;
    public UsersController(IDatingRepository repo, IMapper mapper, IMovieRepository movieRepo)
    {
      _movieRepo = movieRepo;
      _mapper = mapper;
      _repo = repo;

    }
    
    [HttpGet("{id}", Name = "GetUser")]
    public async Task<IActionResult> GetUser(int id)
    {
      var user = await _movieRepo.GetUser(id);

      var userToReturn = _mapper.Map<UserForDetailedDto>(user);

      return Ok(userToReturn);
    }

   
  }
}