namespace Market.Application.Modules.Nightclub.Reservations.Commands.Confirm;

public class ConfirmReservationCommandHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<ConfirmReservationCommand, Unit>
{
    public async Task<Unit> Handle(ConfirmReservationCommand request, CancellationToken ct)
    {
        if (!currentUser.IsAdmin)
            throw new MarketBusinessRuleException("AUTH_001", "Only admins can confirm reservations.");

        var entity = await ctx.Reservations.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
        if (entity is null)
            throw new MarketNotFoundException($"Reservation (ID={request.Id}) not found.");

        if (entity.Status == ReservationStatus.Confirmed)
            throw new MarketBusinessRuleException("RES_001", "Reservation is already confirmed.");

        if (entity.Status == ReservationStatus.Cancelled)
            throw new MarketBusinessRuleException("RES_002", "Cannot confirm a cancelled reservation.");

        entity.Status = ReservationStatus.Confirmed;
        entity.ConfirmedAtUtc = DateTime.UtcNow;
        entity.AdminNote = request.AdminNote?.Trim();

        await ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
