namespace Market.Application.Modules.Nightclub.ClubTables.Commands.Create;

public class CreateClubTableCommandHandler(IAppDbContext ctx)
    : IRequestHandler<CreateClubTableCommand, int>
{
    public async Task<int> Handle(CreateClubTableCommand request, CancellationToken ct)
    {
        var normalized = request.Name?.Trim();

        if (string.IsNullOrWhiteSpace(normalized))
            throw new ValidationException("Name is required.");

        bool exists = await ctx.ClubTables.AnyAsync(x => x.Name == normalized, ct);
        if (exists)
            throw new MarketConflictException("A table with that name already exists.");

        var entity = new ClubTableEntity
        {
            Name = normalized,
            Section = request.Section?.Trim(),
            Capacity = request.Capacity,
            MinSpend = request.MinSpend,
            IsVip = request.IsVip,
            Description = request.Description?.Trim(),
            IsEnabled = true
        };

        ctx.ClubTables.Add(entity);
        await ctx.SaveChangesAsync(ct);

        return entity.Id;
    }
}
