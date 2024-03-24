using HackerNewsApi.Data.Entities;
using HackerNewsApi.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using WebAppNewsBlog.Data;
using WebAppNewsBlog.Helpers;
using WebAppNewsBlog.Models.User;

namespace HackerNewsApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppEFContext _context;

        public UserService(AppEFContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterUserAsync(RegisterViewModel model)
        {
            var userEntity = new UserEntity
            {
                Id = Guid.NewGuid(),
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                Password = model.Password,
                Image = await ImageWorker.SaveImageAsync(model.Image),
                DateCreated = DateTime.UtcNow
            };

            _context.Users.Add(userEntity);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<UserEntity> AuthenticateAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }
    }
}
