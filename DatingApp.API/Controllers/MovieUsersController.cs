using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class MovieUsersController : ControllerBase
  {
    private readonly IMovieRepository _repo;
    private readonly IMapper _mapper;
    public MovieUsersController(IMovieRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;

    }
    [HttpGet("{id}", Name = "GetUser")]
    public async Task<IActionResult> GetUser(int id)
    {
       var user = await _repo.GetUser(id);
       var userToReturn = _mapper.Map<UserForDetailedDto>(user);
       return Ok(userToReturn);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdatesDto userforUpdateDto)
    {
      if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
      {
        return Unauthorized();
      }
      var userFromRepo = await _repo.GetUser(id);
      _mapper.Map(userforUpdateDto, userFromRepo);
      if (await _repo.SaveAll()) {
        return NoContent();
      }
      throw new Exception($"Updating user with {id} failed on save");
    }

  }
}