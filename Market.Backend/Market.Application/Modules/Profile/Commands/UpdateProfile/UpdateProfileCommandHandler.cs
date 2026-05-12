using Market.Application.Abstractions;

namespace Market.Application.Modules.Profile.Commands.UpdateProfile;

public sealed class UpdateProfileCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<UpdateProfileCommand, Unit>
{
    public async Task<Unit> Handle(UpdateProfileCommand request, CancellationToken ct)
    {
        var userId = currentUser.UserId
            ?? throw new MarketConflictException("User not authenticated.");

        var user = await ctx.Users
            .FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted, ct)
            ?? throw new MarketNotFoundException("User not found.");

        var emailLower = request.Email.Trim().ToLowerInvariant();

        var emailTaken = await ctx.Users
            .AnyAsync(u => u.Email.ToLower() == emailLower && u.Id != userId && !u.IsDeleted, ct);

        if (emailTaken)
            throw new MarketConflictException("Email address is already in use.");

        user.Firstname = request.Firstname.Trim();
        user.Lastname  = request.Lastname.Trim();
        user.Email     = emailLower;

        await ctx.SaveChangesAsync(ct);
        return Unit.Value;
    }
}
