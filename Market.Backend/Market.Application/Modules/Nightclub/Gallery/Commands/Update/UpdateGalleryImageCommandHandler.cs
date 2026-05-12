namespace Market.Application.Modules.Nightclub.Gallery.Commands.Update;

public sealed class UpdateGalleryImageCommandHandler(IAppDbContext ctx)
    : IRequestHandler<UpdateGalleryImageCommand, Unit>
{
    public async Task<Unit> Handle(UpdateGalleryImageCommand request, CancellationToken ct)
    {
        var entity = await ctx.GalleryImages.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"GalleryImage (ID={request.Id}) not found.");

        if (request.EventId.HasValue)
        {
            bool eventExists = await ctx.Events.AnyAsync(x => x.Id == request.EventId.Value, ct);
            if (!eventExists)
                throw new MarketNotFoundException($"Event (ID={request.EventId}) not found.");
        }

        entity.ImageUrl = request.ImageUrl.Trim();
        entity.Caption = request.Caption?.Trim();
        entity.DisplayOrder = request.DisplayOrder;
        entity.EventId = request.EventId;
        entity.IsEnabled = request.IsEnabled;

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
