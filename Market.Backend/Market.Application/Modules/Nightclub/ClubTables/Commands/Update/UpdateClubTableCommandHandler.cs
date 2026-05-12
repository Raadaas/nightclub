namespace Market.Application.Modules.Nightclub.ClubTables.Commands.Update;

public sealed class UpdateClubTableCommandHandler(IAppDbContext ctx)
    : IRequestHandler<UpdateClubTableCommand, Unit>
{
    public async Task<Unit> Handle(UpdateClubTableCommand request, CancellationToken ct)
    {
        var entity = await ctx.ClubTables.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"ClubTable (ID={request.Id}) not found.");

        var normalized = request.Name?.Trim();

        bool exists = await ctx.ClubTables
            .AnyAsync(x => x.Id != request.Id && x.Name == normalized, ct);
        if (exists)
            throw new MarketConflictException("A table with that name already exists.");

        entity.Name = normalized!;
        entity.Section = request.Section?.Trim();
        entity.Capacity = request.Capacity;
        entity.MinSpend = request.MinSpend;
        entity.IsVip = request.IsVip;
        entity.Description = request.Description?.Trim();
        entity.IsEnabled = request.IsEnabled;

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
