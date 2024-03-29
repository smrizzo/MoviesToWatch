using System.Threading.Tasks;
using DatingApp.API.Models;

//The interface repository for the controller to interact with
namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string password);
    }
}