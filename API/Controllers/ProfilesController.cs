using Application.Core;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetUserProfile(string userId)
        {
            return HandleResult(await Mediator.Send(new GetUserProfile.Query { UserId = userId }));
        }

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhotos(string userId)
        {
            return HandleResult(await Mediator.Send(new GetPhotos.Query { UserId = userId }));
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile file)
        {
            return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
        }

        [HttpDelete("{photoId}/photos")]
        public async Task<ActionResult<Unit>> DeletePhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult<Unit>> SetMainPhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
        }
    }
}
