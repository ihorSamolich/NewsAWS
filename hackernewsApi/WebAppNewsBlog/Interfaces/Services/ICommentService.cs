using HackerNewsApi.Data.Entities;
using HackerNewsApi.Models.Comment;

namespace HackerNewsApi.Interfaces.Services
{
    public interface ICommentService
    {
        Task<bool> AddComment(int postId, string content, string userEmail);
        Task<bool> ReplyToComment(int commentId, string content, string userEmail);
        Task<IEnumerable<CommentViewModel>> GetAllComments();
        Task<IEnumerable<CommentViewModel>> GetCommentsForPost(string slug);
    }
}


