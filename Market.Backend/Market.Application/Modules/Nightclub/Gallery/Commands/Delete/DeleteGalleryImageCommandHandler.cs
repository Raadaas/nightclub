namespace Market.Application.Modules.Nightclub.Gallery.Commands.Delete;

public class DeleteGalleryImageCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<DeleteGalleryImageCommand, Unit>
{
    public async Task<Unit> Handle(DeleteGalleryImageCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can delete gallery images.");

        var entity = await ctx.GalleryImages.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"GalleryImage (ID={request.Id}) not found.");

        ctx.GalleryImages.Remove(entity);
        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
