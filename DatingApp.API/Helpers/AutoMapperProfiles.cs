using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
               .ForMember(dest => dest.PhotoUrl, opt => {
                  opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
               })
               .ForMember(dest => dest.Age, opt => {
                  opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
               });
            CreateMap<User, UserForDetailedDto>()
               .ForMember(dest => dest.PhotoUrl, opt => {
                  opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
               })
               .ForMember(dest => dest.Age, opt => {
                  opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
               });
            
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdatesDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<Movie, MovieForReturnDto>();
            CreateMap<MovieForCreationDto, Movie>();
            CreateMap<Movie, MovieForCreationDto>();
            CreateMap<MovieForSearchById, Movie>();
            CreateMap<CategoryForCreationDto, MovieCategory>();
            CreateMap<MovieCategory, CategoryForReturnDto>();
            CreateMap<MovieCategory, CategoryForListDto>();
             
        }
    }
}