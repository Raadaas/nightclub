using Market.Application.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace Market.Application.Modules.Profile.Commands.ChangePassword;

public sealed class ChangePasswordCommandHandler(
    IAppDbContext ctx,
    IAppCurrentUser currentUser,
    IPasswordHasher<MarketUserEntity> hasher)
    : IRequestHandler<ChangePasswordCommand, Unit>
{
    public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken ct)
    {
        var userId = currentUser.UserId
            ?? throw new MarketConflictException("User not authenticated.");

        var user = await ctx.Users
            .FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted, ct)
            ?? throw new MarketNotFoundException("User not found.");

        var verify = hasher.VerifyHashedPassword(user, user.PasswordHash, request.CurrentPassword);
        if (verify == PasswordVerificationResult.Failed)
            throw new MarketConflictException("Trenutna lozinka je neispravna.");

        if (request.NewPassword.Length < 6)
            throw new ValidationException("Nova lozinka mora imati najmanje 6 znakova.");

        user.PasswordHash = hasher.HashPassword(user, request.NewPassword);
        await ctx.SaveChangesAsync(ct);
        return Unit.Value;
    }
}
