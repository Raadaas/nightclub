namespace Market.Application.Modules.Nightclub.Events.Commands.Create;

public class CreateEventCommandHandler(IAppDbContext ctx)
    : IRequestHandler<CreateEventCommand, int>
{
    public async Task<int> Handle(CreateEventCommand request, CancellationToken ct)
    {
        var normalized = request.Title?.Trim();

        if (string.IsNullOrWhiteSpace(normalized))
            throw new ValidationException("Title is required.");

        bool exists = await ctx.Events
            .AnyAsync(x => x.Title == normalized && x.Date == request.Date, ct);

        if (exists)
            throw new MarketConflictException("An event with the same title and date already exists.");

        var entity = new EventEntity
        {
            Title = normalized,
            Description = request.Description?.Trim(),
            Date = request.Date,
            DoorsOpenAt = request.DoorsOpenAt,
            MainArtist = request.MainArtist?.Trim(),
            ImageUrl = request.ImageUrl?.Trim(),
            IsPublished = request.IsPublished,
            IsEnabled = true
        };

        ctx.Events.Add(entity);
        await ctx.SaveChangesAsync(ct);

        return entity.Id;
    }
}
