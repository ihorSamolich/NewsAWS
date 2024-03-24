using HackerNewsApi.Data.Entities;
using HackerNewsApi.Models.Post;
using HackerNewsApi.Models.QueryParams;

namespace HackerNewsApi.Interfaces.Services
{
    public interface IPostService
    {
        List<PostViewModel> GetAllPosts(QueryParams queryParams);
        Task<PostViewModel> GetPostBySlug(string slug);
        int GetPostsCount();
    }
}
