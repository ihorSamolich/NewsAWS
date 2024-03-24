using AutoMapper;
using HackerNewsApi.Data.Entities;
using HackerNewsApi.Models.Category;
using HackerNewsApi.Models.Comment;
using HackerNewsApi.Models.Post;
using HackerNewsApi.Models.Tag;
using HackerNewsApi.Models.User;
using WebAppNewsBlog.Data;

namespace WebAppNewsBlog.AutoMapper
{
    public class AppMapProfile : Profile
    {
        private readonly AppEFContext _context;
        public AppMapProfile(AppEFContext context)
        {
            _context = context;

            CreateMap<UserEntity, UserPostViewModel>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName));

            CreateMap<CategoryEntity, CategoryViewModel>();
            CreateMap<TagEntity, TagViewModel>();

            CreateMap<PostEntity, PostViewModel>()
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.PostTags.Select(pt => pt.Tag).ToList()))
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.UserPosts.FirstOrDefault().User));

            CreateMap<CommentEntity, CommentViewModel>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName))
                .ForMember(dest => dest.UserAvatar, opt => opt.MapFrom(src => src.User.Image));

        }
    }
}