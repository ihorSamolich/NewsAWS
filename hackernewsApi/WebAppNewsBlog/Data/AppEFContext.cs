using HackerNewsApi.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Emit;

namespace WebAppNewsBlog.Data
{
    public class AppEFContext : DbContext
    {
        public AppEFContext(DbContextOptions<AppEFContext> options)
            : base(options)
        { }

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<PostEntity> Posts { get; set; }
        public DbSet<TagEntity> Tags { get; set; }
        public DbSet<PostTagMapEntity> PostTags { get; set; }
        public DbSet<UserPostMapEntity> UserPosts { get; set; }

        public DbSet<CommentEntity> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserEntity>()
                .HasIndex(u => u.Email)
            .IsUnique();
            builder.Entity<UserEntity>()
                .HasIndex(u => u.Phone)
                .IsUnique();

            builder.Entity<PostTagMapEntity>(ur =>
            {
                ur.HasKey(ur => new { ur.PostId, ur.TagId });
            });

            builder.Entity<UserPostMapEntity>(ur =>
            {
                ur.HasKey(ur => new { ur.UserId, ur.PostId });
            });

            builder.Entity<CategoryEntity>().HasIndex(u => u.Name).IsUnique();
            builder.Entity<TagEntity>().HasIndex(u => u.Name).IsUnique();
            builder.Entity<PostEntity>().HasIndex(u => u.UrlSlug).IsUnique();

            builder.Entity<CommentEntity>()
               .HasOne(c => c.Post)
               .WithMany(p => p.Comments)
               .HasForeignKey(c => c.PostId);

            builder.Entity<CommentEntity>()
               .HasOne(c => c.Parent)
               .WithMany(c => c.Replies)
               .HasForeignKey(c => c.ParentId);
        }
    }
}
