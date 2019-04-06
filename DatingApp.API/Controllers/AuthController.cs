using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    private readonly IConfiguration _config;
    private readonly IMapper _mapper;

    public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
      _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      //validate the request

      userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
      if (await _repo.UserExists(userForRegisterDto.Username))
        return BadRequest("Username already exist");

      var userToCreate = _mapper.Map<User>(userForRegisterDto); //mapper to grab only the fields we want

      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

      var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);
      return CreatedAtRoute("GetUser", new {controller = "Users", id = createdUser.Id}, userToReturn);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    {
      //checking that username password 
      var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

      if (userFromRepo == null)
        return Unauthorized();

      //building token with two claims where one is user id and other claim is users, username
      var claims = new[]
      {
            new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
            new Claim(ClaimTypes.Name, userFromRepo.Username)
         };

      //making sure token is a valid token when it comes back our server needs to sign this token
      //creating a security key
      var key = new SymmetricSecurityKey(Encoding.UTF8
         .GetBytes(_config.GetSection("AppSettings:Token").Value));

      //Using key above as part of the signing credentials and encrypting that key with hashing algorithm
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      //create a token descriptor where we pass in our claims as subject, give it expiration date for 1 day
      //then pass in signing credentials
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(1),
        SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      //create a token based on tokenDescriptor using the token handler
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var user = _mapper.Map<UserForListDto>(userFromRepo);


      //write token to client
      return Ok(new
      {
        token = tokenHandler.WriteToken(token),
        user
      });
    }

  }
}