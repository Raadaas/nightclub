namespace Market.Application.Modules.Nightclub.MenuItems.Commands.Update;

public sealed class UpdateMenuItemCommandHandler(IAppDbContext ctx)
    : IRequestHandler<UpdateMenuItemCommand, Unit>
{
    public async Task<Unit> Handle(UpdateMenuItemCommand request, CancellationToken ct)
    {
        var entity = await ctx.MenuItems.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"MenuItem (ID={request.Id}) not found.");

        var category = await ctx.MenuCategories.FirstOrDefaultAsync(x => x.Id == request.MenuCategoryId, ct);
        if (category is null)
            throw new MarketNotFoundException($"MenuCategory (ID={request.MenuCategoryId}) not found.");

        entity.Name = request.Name.Trim();
        entity.Description = request.Description?.Trim();
        entity.Price = request.Price;
        entity.ImageUrl = request.ImageUrl?.Trim();
        entity.DisplayOrder = request.DisplayOrder;
        entity.MenuCategoryId = request.MenuCategoryId;
        entity.IsEnabled = request.IsEnabled;

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
