using Market.Application.Abstractions;

namespace Market.Application.Modules.Profile.Queries.Get;

public sealed class GetProfileQueryHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<GetProfileQuery, GetProfileQueryDto>
{
    public async Task<GetProfileQueryDto> Handle(GetProfileQuery request, CancellationToken ct)
    {
        var userId = currentUser.UserId
            ?? throw new MarketConflictException("User not authenticated.");

        var user = await ctx.Users
            .FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted, ct)
            ?? throw new MarketNotFoundException("User not found.");

        return new GetProfileQueryDto
        {
            Id = user.Id,
            Firstname = user.Firstname,
            Lastname = user.Lastname,
            Email = user.Email,
            IsAdmin = user.IsAdmin,
            IsManager = user.IsManager,
            IsEmployee = user.IsEmployee,
        };
    }
}
