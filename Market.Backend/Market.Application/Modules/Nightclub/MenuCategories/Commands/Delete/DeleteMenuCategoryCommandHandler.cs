namespace Market.Application.Modules.Nightclub.MenuCategories.Commands.Delete;

public class DeleteMenuCategoryCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<DeleteMenuCategoryCommand, Unit>
{
    public async Task<Unit> Handle(DeleteMenuCategoryCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can delete menu categories.");

        var entity = await ctx.MenuCategories.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"MenuCategory (ID={request.Id}) not found.");

        ctx.MenuCategories.Remove(entity);
        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
