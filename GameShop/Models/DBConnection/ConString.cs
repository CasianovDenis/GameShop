using Microsoft.EntityFrameworkCore;

namespace GameShop.Models.DBConnection
{
    public class ConString : DbContext
    {
        public ConString(DbContextOptions<ConString> options) : base(options)
        {

        }

        public DbSet<Game> Game { get; set; }
        public DbSet<Users> Users { get; set; }

        public DbSet<UserPurchases> UserPurchases { get; set; }

        public DbSet<GamesCommentary> GamesCommentary { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Users>().HasData(new Users
            {
                ID = 1,
                Username = "admin",
                Password = "admin",
                Email = "admin@gmail.com",
                Role = "admin"
            });

        }
    }
}
