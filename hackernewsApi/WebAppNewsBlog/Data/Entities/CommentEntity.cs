using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;

namespace HackerNewsApi.Data.Entities
{
    [Table("Comments")]
    public class CommentEntity
    {
        public int Id { get; set; }

        public string Content { get; set; }


        [ForeignKey("User")]
        public Guid UserId { get; set; }


        [ForeignKey("Post")]
        public int PostId { get; set; }
        public int? ParentId { get; set; }

        public virtual DateTime DataCreated { get; set; }

        public virtual UserEntity User { get; set; }
        public virtual PostEntity Post { get; set; }
        public virtual CommentEntity Parent { get; set; }
        public virtual ICollection<CommentEntity> Replies { get; set; }
    }
}
