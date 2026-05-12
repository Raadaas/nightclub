namespace Market.Application.Modules.Nightclub.Events.Commands.Update;

public sealed class UpdateEventCommandHandler(IAppDbContext ctx)
    : IRequestHandler<UpdateEventCommand, Unit>
{
    public async Task<Unit> Handle(UpdateEventCommand request, CancellationToken ct)
    {
        var entity = await ctx.Events
            .FirstOrDefaultAsync(x => x.Id == request.Id, ct);

        if (entity is null)
            throw new MarketNotFoundException($"Event (ID={request.Id}) not found.");

        var normalized = request.Title?.Trim();

        bool exists = await ctx.Events
            .AnyAsync(x => x.Id != request.Id && x.Title == normalized && x.Date == request.Date, ct);

        if (exists)
            throw new MarketConflictException("An event with the same title and date already exists.");

        entity.Title = normalized!;
        entity.Description = request.Description?.Trim();
        entity.Date = request.Date;
        entity.DoorsOpenAt = request.DoorsOpenAt;
        entity.MainArtist = request.MainArtist?.Trim();
        entity.ImageUrl = request.ImageUrl?.Trim();
        entity.IsPublished = request.IsPublished;
        entity.IsEnabled = request.IsEnabled;

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
