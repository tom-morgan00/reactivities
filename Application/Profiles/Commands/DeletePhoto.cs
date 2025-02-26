using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class HandleResult(AppDbContext context, IPhotoService photoService, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos
                .FirstOrDefault(x => x.Id == request.PhotoId);
            if (photo == null) return Result<Unit>.Failure("Photo not found", 404);

            if (photo.Url == user.ImageUrl) return Result<Unit>.Failure("Cannot delete active photo", 400);

            await photoService.DeletePhoto(photo.PublicId);

            user.Photos.Remove(photo);
            return await context.SaveChangesAsync(cancellationToken) > 0
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to remove photo", 400);
        }
    }

}
