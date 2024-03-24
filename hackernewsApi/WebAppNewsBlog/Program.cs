using AutoMapper;
using HackerNewsApi.Interfaces.Services;
using HackerNewsApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAppNewsBlog.AutoMapper;
using WebAppNewsBlog.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppEFContext>(opt =>
               opt.UseNpgsql(builder.Configuration.GetConnectionString("DBConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();


// MAPPER SETTINGS
#region

builder.Services.AddScoped(provider => new MapperConfiguration(config =>
    {
        config.AddProfile(new AppMapProfile(provider.GetService<AppEFContext>()));
    }).CreateMapper());

#endregion


var app = builder.Build();

app.UseCors(options =>
    options.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.UseSwagger();
app.UseSwaggerUI();


// STATIC FILES OPTIONS
#region

var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
if (!Directory.Exists(dir))
{
    Directory.CreateDirectory(dir);
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dir),
    RequestPath = "/images"
});

#endregion

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.SeedData();

app.Run();
