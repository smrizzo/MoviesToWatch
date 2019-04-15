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
               .ForMember(dest => dest.Age, opt => {
                  opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
               });
            CreateMap<User, UserForDetailedDto>()
               .ForMember(dest => dest.Age, opt => {
                  opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
               });
            
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdatesDto, User>();

            //mappers for photos
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            
            //mappers for categories
            CreateMap<CategoryForUpdateDto, MovieCategory>();
            CreateMap<CategoryForCreationDto, MovieCategory>();
            CreateMap<MovieCategory, CategoryForReturnDto>();
            CreateMap<MovieCategory, CategoryForListDto>();

            //mappers for movies
            CreateMap<MovieForUpdateDto, Movie>();
            CreateMap<Movie, MovieForReturnDto>();
            CreateMap<MovieForCreationDto, Movie>();
            CreateMap<Movie, MovieForCreationDto>();
            CreateMap<MovieForSearchById, Movie>();
            CreateMap<Movie, MovieForListDto>();
             
        }
    }
}