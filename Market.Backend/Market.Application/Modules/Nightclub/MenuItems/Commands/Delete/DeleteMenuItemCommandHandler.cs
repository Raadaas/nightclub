namespace Market.Application.Modules.Nightclub.MenuItems.Commands.Delete;

public class DeleteMenuItemCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<DeleteMenuItemCommand, Unit>
{
    public async Task<Unit> Handle(DeleteMenuItemCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can delete menu items.");

        var entity = await ctx.MenuItems.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"MenuItem (ID={request.Id}) not found.");

        ctx.MenuItems.Remove(entity);
        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
