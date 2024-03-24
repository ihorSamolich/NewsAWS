using HackerNewsApi.Data.Entities;
using WebAppNewsBlog.Models.User;

namespace HackerNewsApi.Interfaces.Services
{
    public interface IUserService
    {
        Task<bool> RegisterUserAsync(RegisterViewModel model);
        Task<UserEntity> AuthenticateAsync(string email);

    }
}
