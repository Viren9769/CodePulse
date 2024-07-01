using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.Data
{
    public class AuthDbContext : IdentityDbContext                // this class inherits from the identity DbContext 
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var readerRoleId = "0df45b7f-229b-4a56-8030-5007c0e33d62";
            var writerRoleId = "338f493b-b1b6-4e44-ae6f-9214981e3f24";
            // create  reader and writer role 
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            }; 

            // Seed the roles
            builder.Entity<IdentityRole>().HasData(roles);

            // Create an Admin User

            var adminuserId = "8d99a5f9-eb4d-4671-9636-65e52befe7d7";

            var admin = new IdentityUser()
            {
                Id = adminuserId,
                UserName = "admin@codepulse.com",
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper(),
                NormalizedUserName = "admin@codepulse.com".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

            builder.Entity<IdentityUser>().HasData(admin);


            //give Roles to admin
            var adminRoles = new List<IdentityUserRole<String>>()
            {
            new()
            {
                UserId = adminuserId,
                RoleId = readerRoleId
            },
            new()
            {
                UserId = adminuserId,
                RoleId = writerRoleId
            }

            };
            builder.Entity<IdentityUserRole<String>>().HasData(adminRoles);

             
        }
    }
}
