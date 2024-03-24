using System.ComponentModel.DataAnnotations.Schema;

namespace HackerNewsApi.Data.Entities
{
    [Table("UserPostMap")]
    public class UserPostMapEntity
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [ForeignKey("Post")]
        public int PostId { get; set; }

        public virtual UserEntity User { get; set; }
        public virtual PostEntity Post { get; set; }
    }
}
