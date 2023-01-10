﻿using Microsoft.EntityFrameworkCore;

namespace GameShop.Models.DBConnection
{
    public class ConString : DbContext
    {
        public ConString(DbContextOptions<ConString> options) : base(options)
        {

        }

        public DbSet<Game> Game { get; set; }
        public DbSet<Users> Users { get; set; }

        //        public DbSet<Password_store> Password_store { get; set; }
    }
}
