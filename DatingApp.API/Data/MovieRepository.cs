using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
  public class MovieRepository : IMovieRepository
  {
    private readonly DataContext _context;
    public MovieRepository(DataContext context)
    {
      _context = context;

    }
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
       _context.Remove(entity);
    }

    public async Task<Photo> GetPhoto(int id)
    {
        var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
        return photo;
    }
    public async Task<MovieCategory> GetMovieCategory(int id)
    {
      return await _context.MovieCategories.Include(m => m.Movies).FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<PagedList<MovieCategory>> GetCategories(UserParams userParams)
    {
      
      var categories = _context.MovieCategories.Include(m => m.Movies).AsQueryable();
      categories = categories.Where(u => u.UserId == userParams.UserId);

      if(!string.IsNullOrEmpty(userParams.OrderBy))
         {
           switch (userParams.OrderBy)
           {
             case "title":
              categories = categories.OrderByDescending(u => u.Title);
              break;
              default:
                categories = categories.OrderByDescending(u => u.Id);
                break;
           }
         }

      return await PagedList<MovieCategory>.CreateAsync(categories, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<User> GetUser(int id) {
      return await _context.Users
        .Include(u => u.MovieCategories)
          .ThenInclude(u => u.Movies)
          .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<Movie> GetMovie(int id)
    {
      var movie = await _context.Movies.FirstOrDefaultAsync(m => m.Id == id);
      return movie;
    }

    public async Task<PagedList<Movie>> GetMovies(UserParams userParams)
    {
      var movies = _context.Movies.AsQueryable();
      movies = movies.Where(m => m.MovieCategoryId == userParams.MovieCategoryId);

      if(!string.IsNullOrEmpty(userParams.OrderBy))
         {
           switch (userParams.OrderBy)
           {
             case "year":
              movies = movies.OrderByDescending(m => m.Year);
              break;
             case "runtime":
              movies = movies.OrderByDescending(m => m.Runtime);
              break;
             default:
              movies = movies.OrderByDescending(m => m.Id);
              break;
           }
         }

      return await PagedList<Movie>.CreateAsync(movies, userParams.PageNumber, userParams.PageSize); 
    }

    public async Task<bool> SaveAll()
    {
      return await _context.SaveChangesAsync() > 0;
    }

  }
}