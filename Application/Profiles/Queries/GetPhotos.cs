using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetPhotos
{
    public class Query : IRequest<Result<List<Photo>>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
                .Where(x => x.Id == request.UserId)
                .SelectMany(x => x.Photos)
                .ToListAsync();

            return Result<List<Photo>>.Success(photos);
        }
    }
}
