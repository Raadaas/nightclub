namespace Market.Application.Modules.Nightclub.ClubTables.Commands.Delete;

public class DeleteClubTableCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<DeleteClubTableCommand, Unit>
{
    public async Task<Unit> Handle(DeleteClubTableCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can delete tables.");

        var entity = await ctx.ClubTables.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"ClubTable (ID={request.Id}) not found.");

        ctx.ClubTables.Remove(entity);
        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
