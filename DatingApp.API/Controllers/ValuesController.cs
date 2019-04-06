using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
   // http://localhost:5000/api/values
   //controller gets replaced with Valus from ValuesController??
   [Authorize]
   // [Authorize (AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
   [Route("api/[controller]")]
   [ApiController]
   public class ValuesController : ControllerBase
   {
      private readonly DataContext _context;

      public ValuesController(DataContext context)
      {
         _context = context;

      }
      // GET api/values
      //IEnumerable is just a collection of things and this case its a collection of strings
      [AllowAnonymous]
      [HttpGet]
      public async Task<IActionResult> GetValues()
      {
         // throw new Exception("Test exception");
         //this is whats being returned with the api/values endpoint
         // return new string[] { "value1", "value3" };

         var values = await _context.Values.ToListAsync();
         return Ok(values);

      }

      // GET api/values/5
      [AllowAnonymous]
      [HttpGet("{id}")]
      public async Task<IActionResult> GetValueById(int id)
      {
         //when api/values/5 it will return just a string value of "value"
         //When can specific other routes to return whatever data we like
         // return "value";

         var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
         return Ok(value);
      }

      // POST api/values
      [HttpPost]
      public void Post([FromBody] string value)
      {
      }

      // PUT api/values/5
      [HttpPut("{id}")]
      public void Put(int id, [FromBody] string value)
      {
      }

      // DELETE api/values/5
      [HttpDelete("{id}")]
      public void Delete(int id)
      {
      }
   }
}
