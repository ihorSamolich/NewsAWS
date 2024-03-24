using HackerNewsApi.Data.Entities;
using HackerNewsApi.Models.Category;
using HackerNewsApi.Models.Tag;
using HackerNewsApi.Models.User;

namespace HackerNewsApi.Models.Post
{
    public class PostViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Meta { get; set; }
        public string UrlSlug { get; set; }
        public bool Published { get; set; }
        public DateTime PostedOn { get; set; }
        public DateTime? Modified { get; set; }
        public CategoryViewModel Category { get; set; }
        public UserPostViewModel User { get; set; }
        public ICollection<TagViewModel> Tags { get; set; }
    }
}
