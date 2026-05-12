namespace Market.Application.Modules.Nightclub.Gallery.Commands.Create;

public class CreateGalleryImageCommandHandler(IAppDbContext ctx)
    : IRequestHandler<CreateGalleryImageCommand, int>
{
    public async Task<int> Handle(CreateGalleryImageCommand request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.ImageUrl))
            throw new ValidationException("ImageUrl is required.");

        if (request.EventId.HasValue)
        {
            bool eventExists = await ctx.Events.AnyAsync(x => x.Id == request.EventId.Value, ct);
            if (!eventExists)
                throw new MarketNotFoundException($"Event (ID={request.EventId}) not found.");
        }

        var entity = new GalleryImageEntity
        {
            ImageUrl = request.ImageUrl.Trim(),
            Caption = request.Caption?.Trim(),
            DisplayOrder = request.DisplayOrder,
            EventId = request.EventId,
            IsEnabled = true
        };

        ctx.GalleryImages.Add(entity);
        await ctx.SaveChangesAsync(ct);

        return entity.Id;
    }
}
