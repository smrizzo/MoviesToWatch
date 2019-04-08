using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IMovieRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();

         Task<Movie> GetMovie(int id);
         Task<User> GetUser(int id);

         Task<MovieCategory> GetMovieCategory(int id);

         Task<PagedList<MovieCategory>> GetCategories(UserParams userParams);
         Task<PagedList<Movie>> GetMovies(UserParams userParams);
    }
}