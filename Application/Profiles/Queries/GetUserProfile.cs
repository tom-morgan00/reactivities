using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserProfile
{
    public class Query : IRequest<Result<UserProfile>>
    {
        public required string UserId { get; set; }
    }

    public class HandleResult(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<UserProfile>>
    {
        public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await context.Users
                .ProjectTo<UserProfile>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.UserId);
            if (profile == null) return Result<UserProfile>.Failure("User not found", 404);

            return Result<UserProfile>.Success(profile);
        }
    }
}
