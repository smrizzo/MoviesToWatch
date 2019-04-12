using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
   // the : is inheritance in C# instead
    public class DataContext : DbContext
    {
       //This constructur for this class and : base is saying same as super(options)
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

         //These properties will be of type DbSet
         //pluralize the name from entities and values will be the name of the table SQL
        
        public DbSet<User> Users { get; set; }
        public DbSet<MovieCategory> MovieCategories { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Movie> Movies { get; set; }
        
  
    }
}