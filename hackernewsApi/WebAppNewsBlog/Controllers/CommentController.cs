using HackerNewsApi.Data.Entities;
using HackerNewsApi.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
using HackerNewsApi.Models.Comment;

namespace HackerNewsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            var comments = await _commentService.GetAllComments();

            return Ok(comments);
        }


        [HttpGet("post/{slug}")]
        public async Task<IActionResult> GetCommentsForPost(string slug)
        {
            var comments = await _commentService.GetCommentsForPost(slug);
            return Ok(comments);
        }


        [HttpPost("add-comment")]
        public async Task<IActionResult> AddComment(CreateCommentViewModel createComment)
        {
            var success = await _commentService.AddComment(createComment.PostId, createComment.Content, createComment.UserEmail);
            if (success)
                return Ok();
            else
                return BadRequest();
        }

        [HttpPost("reply-to-comment")]
        public async Task<IActionResult> ReplyToComment(CreateReplyViewModel createReply)
        {
            var success = await _commentService.ReplyToComment(createReply.CommentId, createReply.Content, createReply.UserEmail);
            if (success)
                return Ok();
            else
                return NotFound();
        }
    }
}
