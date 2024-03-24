using HackerNewsApi.Models.Tag;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HackerNewsApi.Data.Entities
{
    [Table("Users")]
    public class UserEntity
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(100)]
        public string Phone { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [StringLength(100)]
        public string Image { get; set; }

        public DateTime DateCreated { get; set; }

        public virtual ICollection<UserPostMapEntity> UserPosts { get; set; }
        public virtual ICollection<CommentEntity> Comments { get; set; }


    }
}
