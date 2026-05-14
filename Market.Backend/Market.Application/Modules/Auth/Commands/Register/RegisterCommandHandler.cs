using Market.Application.Common.Exceptions;
using Market.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Market.Application.Modules.Auth.Commands.Register;

public sealed class RegisterCommandHandler(
    IAppDbContext ctx,
    IPasswordHasher<MarketUserEntity> hasher)
    : IRequestHandler<RegisterCommand, Unit>
{
    public async Task<Unit> Handle(RegisterCommand request, CancellationToken ct)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var exists = await ctx.Users
            .AnyAsync(u => u.Email.ToLower() == email && !u.IsDeleted, ct);

        if (exists)
            throw new MarketConflictException("Korisnik s ovom email adresom već postoji.");

        if (request.Password.Length < 6)
            throw new MarketConflictException("Lozinka mora imati najmanje 6 znakova.");

        var user = new MarketUserEntity
        {
            Firstname  = request.Firstname.Trim(),
            Lastname   = request.Lastname.Trim(),
            Email      = email,
            IsEnabled  = true,
            IsAdmin    = false,
            IsManager  = false,
            IsEmployee = false,
        };

        user.PasswordHash = hasher.HashPassword(user, request.Password);

        ctx.Users.Add(user);
        await ctx.SaveChangesAsync(ct);
        return Unit.Value;
    }
}
