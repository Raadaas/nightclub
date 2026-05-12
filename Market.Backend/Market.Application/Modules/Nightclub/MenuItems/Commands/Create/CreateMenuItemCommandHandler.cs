namespace Market.Application.Modules.Nightclub.MenuItems.Commands.Create;

public class CreateMenuItemCommandHandler(IAppDbContext ctx)
    : IRequestHandler<CreateMenuItemCommand, int>
{
    public async Task<int> Handle(CreateMenuItemCommand request, CancellationToken ct)
    {
        var normalized = request.Name?.Trim();
        if (string.IsNullOrWhiteSpace(normalized))
            throw new ValidationException("Name is required.");

        var category = await ctx.MenuCategories.FirstOrDefaultAsync(x => x.Id == request.MenuCategoryId, ct);
        if (category is null)
            throw new MarketNotFoundException($"MenuCategory (ID={request.MenuCategoryId}) not found.");

        if (!category.IsEnabled)
            throw new ValidationException($"Category '{category.Name}' is disabled.");

        var entity = new MenuItemEntity
        {
            Name = normalized,
            Description = request.Description?.Trim(),
            Price = request.Price,
            ImageUrl = request.ImageUrl?.Trim(),
            DisplayOrder = request.DisplayOrder,
            MenuCategoryId = request.MenuCategoryId,
            IsEnabled = true
        };

        ctx.MenuItems.Add(entity);
        await ctx.SaveChangesAsync(ct);

        return entity.Id;
    }
}
