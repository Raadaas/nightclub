namespace Market.Application.Modules.Nightclub.Events.Commands.Delete;

public class DeleteEventCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<DeleteEventCommand, Unit>
{
    public async Task<Unit> Handle(DeleteEventCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can delete events.");

        var entity = await ctx.Events
            .FirstOrDefaultAsync(x => x.Id == request.Id, ct);

        if (entity is null)
            throw new MarketNotFoundException($"Event (ID={request.Id}) not found.");

        ctx.Events.Remove(entity);
        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
