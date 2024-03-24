using AutoMapper;
using HackerNewsApi.Data.Entities;
using HackerNewsApi.Interfaces.Services;
using HackerNewsApi.Models.Comment;
using Microsoft.EntityFrameworkCore;
using WebAppNewsBlog.Data;

namespace HackerNewsApi.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public CommentService(AppEFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> AddComment(int postId, string content, string userEmail)
        {
            var UserId = _context.Users.Where(u => u.Email == userEmail).FirstOrDefault().Id;

            var comment = new CommentEntity
            {
                PostId = postId,
                Content = content,
                UserId = UserId,
                DataCreated = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CommentViewModel>> GetAllComments()
        {
            var comments = await _context.Comments
                .Include(x => x.User)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CommentViewModel>>(comments);
        }


        public async Task<IEnumerable<CommentViewModel>> GetCommentsForPost(string slug)
        {
            var post = await _context.Posts
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(p => p.UrlSlug == slug);

            if (post == null)
            {
                return Enumerable.Empty<CommentViewModel>();
            }

            return _mapper.Map<IEnumerable<CommentViewModel>>(post.Comments.Where(c => c.ParentId == null));
        }

        public async Task<bool> ReplyToComment(int commentId, string content, string userEmail)
        {
            var parentComment = await _context.Comments.FindAsync(commentId);
            if (parentComment == null)
            {
                return false;
            }

            var UserId = _context.Users.Where(u => u.Email == userEmail).FirstOrDefault().Id;

            var reply = new CommentEntity
            {
                ParentId = commentId,
                PostId = parentComment.PostId,
                Content = content,
                UserId = UserId,
                DataCreated = DateTime.UtcNow
            };

            _context.Comments.Add(reply);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
