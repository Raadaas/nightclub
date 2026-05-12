namespace Market.Application.Modules.Nightclub.MenuCategories.Commands.Create;

public class CreateMenuCategoryCommandHandler(IAppDbContext ctx)
    : IRequestHandler<CreateMenuCategoryCommand, int>
{
    public async Task<int> Handle(CreateMenuCategoryCommand request, CancellationToken ct)
    {
        var normalized = request.Name?.Trim();
        if (string.IsNullOrWhiteSpace(normalized))
            throw new ValidationException("Name is required.");

        bool exists = await ctx.MenuCategories.AnyAsync(x => x.Name == normalized, ct);
        if (exists)
            throw new MarketConflictException("A menu category with that name already exists.");

        var entity = new MenuCategoryEntity
        {
            Name = normalized,
            DisplayOrder = request.DisplayOrder,
            IsEnabled = true
        };

        ctx.MenuCategories.Add(entity);
        await ctx.SaveChangesAsync(ct);

        return entity.Id;
    }
}
