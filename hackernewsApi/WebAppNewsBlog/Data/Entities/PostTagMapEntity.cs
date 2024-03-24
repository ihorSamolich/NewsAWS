using System.ComponentModel.DataAnnotations.Schema;

namespace HackerNewsApi.Data.Entities
{
    [Table("PostTagMap")]
    public class PostTagMapEntity
    {
        [ForeignKey("Post")]
        public int PostId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual PostEntity Post { get; set; }
        public virtual TagEntity Tag { get; set; }
    }
}
