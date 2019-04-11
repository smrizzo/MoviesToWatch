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
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MovieCategory> MovieCategories { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Like> Likes { get; set; }
        
        


        protected override void OnModelCreating(ModelBuilder builder)
        {
          builder.Entity<Like>()
            .HasKey(k => new {k.LikerId, k.LikeeId});

          builder.Entity<Like>()
            .HasOne(u => u.Likee)
            .WithMany(u => u.Likers)
            .HasForeignKey(u => u.LikeeId)
            .OnDelete(DeleteBehavior.Restrict);
            
          builder.Entity<Like>()
            .HasOne(u => u.Liker)
            .WithMany(u => u.Likees)
            .HasForeignKey(u => u.LikerId)
            .OnDelete(DeleteBehavior.Restrict);

          // builder.Entity<Category>()
          //   .HasOne(u => u.User)
          //   .WithMany(u => u.Categories)
          //   .HasForeignKey(u => u.UserId)
          //   .OnDelete(DeleteBehavior.Cascade);

          // builder.Entity<User>()
          //   .HasMany(u => u.Categories)
          //   .WithOne(u => u.User);

          // builder.Entity<Movie>()
          //   .HasOne(u => u.Categories)
          //   .WithMany(u => u.Movies)
          //   .HasForeignKey(u => u.CategoryId)
          //   .OnDelete(DeleteBehavior.Cascade);

          
        }
    }
}