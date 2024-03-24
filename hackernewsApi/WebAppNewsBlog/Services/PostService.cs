using AutoMapper;
using HackerNewsApi.Data.Entities;
using HackerNewsApi.Interfaces.Services;
using HackerNewsApi.Models.Post;
using HackerNewsApi.Models.QueryParams;
using Microsoft.EntityFrameworkCore;
using WebAppNewsBlog.Data;

namespace HackerNewsApi.Services
{
    public class PostService : IPostService
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public PostService(AppEFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<PostViewModel> GetAllPosts(QueryParams queryParams)
        {
            var postEntities = _context.Posts
                .Include(p => p.UserPosts)
                    .ThenInclude(u => u.User)
                .Include(p => p.Category)
                .Include(p => p.PostTags)
                    .ThenInclude(t => t.Tag)
                .OrderByDescending(p => p.PostedOn)
                .Skip(queryParams.Page * queryParams.PageSize - queryParams.PageSize)
                .Take(queryParams.PageSize);

            var posts = _mapper.Map<List<PostViewModel>>(postEntities);

            return posts;

        }

        public int GetPostsCount()
        {
            return _context.Posts.Count();
        }

        public async Task<PostViewModel> GetPostBySlug(string slug)
        {
            var post = await _context.Posts
                .Include(p => p.UserPosts)
                    .ThenInclude(u => u.User)
                .Include(p => p.Category)
                .Include(p => p.PostTags)
                    .ThenInclude(t => t.Tag)
                .Where(p => p.UrlSlug == slug)
                .SingleOrDefaultAsync();

            return _mapper.Map<PostViewModel>(post);
        }
    }
}
