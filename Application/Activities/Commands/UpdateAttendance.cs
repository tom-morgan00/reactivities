using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(x => x.Attendees)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            var isHost = activity.Attendees.Any(x => x.UserId == user.Id && x.IsHost);

            if (attendance == null)
            {
                activity.Attendees.Add(new ActivityAttendee
                {
                    ActivityId = request.Id,
                    UserId = user.Id,
                    IsHost = false
                });
            }
            else
            {
                if (isHost)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else
                {
                    activity.Attendees.Remove(attendance);
                }
            }
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Attendee failed to save", 500);
            return Result<Unit>.Success(Unit.Value);

        }
    }
}
