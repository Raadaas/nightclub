namespace Market.Application.Modules.Nightclub.MenuCategories.Commands.Update;

public sealed class UpdateMenuCategoryCommandHandler(IAppDbContext ctx)
    : IRequestHandler<UpdateMenuCategoryCommand, Unit>
{
    public async Task<Unit> Handle(UpdateMenuCategoryCommand request, CancellationToken ct)
    {
        var entity = await ctx.MenuCategories.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"MenuCategory (ID={request.Id}) not found.");

        var normalized = request.Name?.Trim();
        bool exists = await ctx.MenuCategories
            .AnyAsync(x => x.Id != request.Id && x.Name == normalized, ct);
        if (exists)
            throw new MarketConflictException("A menu category with that name already exists.");

        entity.Name = normalized!;
        entity.DisplayOrder = request.DisplayOrder;
        entity.IsEnabled = request.IsEnabled;

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
