namespace Market.Application.Modules.Nightclub.Reservations.Commands.Cancel;

public class CancelReservationCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<CancelReservationCommand, Unit>
{
    public async Task<Unit> Handle(CancelReservationCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can cancel reservations.");

        var entity = await ctx.Reservations.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"Reservation (ID={request.Id}) not found.");

        if (entity.Status == ReservationStatus.Cancelled)
            throw new MarketBusinessRuleException("RES_003", "Reservation is already cancelled.");

        entity.Status = ReservationStatus.Cancelled;
        entity.CancelledAtUtc = DateTime.UtcNow;
        entity.AdminNote = request.AdminNote?.Trim();

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
