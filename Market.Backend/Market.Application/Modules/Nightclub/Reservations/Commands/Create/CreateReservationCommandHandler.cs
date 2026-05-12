namespace Market.Application.Modules.Nightclub.Reservations.Commands.Create;

public class CreateReservationCommandHandler(IAppDbContext ctx)
    : IRequestHandler<CreateReservationCommand, int>
{
    public async Task<int> Handle(CreateReservationCommand request, CancellationToken ct)
    {
        var eventEntity = await ctx.Events.FirstOrDefaultAsync(x => x.Id == request.EventId, ct);
        if (eventEntity is null)
            throw new MarketNotFoundException($"Event (ID={request.EventId}) not found.");

        if (!eventEntity.IsPublished || !eventEntity.IsEnabled)
            throw new MarketBusinessRuleException("EVT_001", "This event is not available for reservations.");

        var table = await ctx.ClubTables.FirstOrDefaultAsync(x => x.Id == request.ClubTableId, ct);
        if (table is null)
            throw new MarketNotFoundException($"Table (ID={request.ClubTableId}) not found.");

        if (!table.IsEnabled)
            throw new MarketBusinessRuleException("TBL_001", "This table is not available.");

        bool tableAlreadyReserved = await ctx.Reservations
            .AnyAsync(x => x.EventId == request.EventId
                        && x.ClubTableId == request.ClubTableId
                        && x.Status != ReservationStatus.Cancelled, ct);

        if (tableAlreadyReserved)
            throw new MarketConflictException("This table is already reserved for the selected event.");

        if (request.NumberOfGuests < 1 || request.NumberOfGuests > table.Capacity)
            throw new ValidationException($"Number of guests must be between 1 and {table.Capacity}.");

        var entity = new ReservationEntity
        {
            EventId = request.EventId,
            ClubTableId = request.ClubTableId,
            GuestName = request.GuestName.Trim(),
            GuestEmail = request.GuestEmail.Trim(),
            GuestPhone = request.GuestPhone.Trim(),
            NumberOfGuests = request.NumberOfGuests,
            Note = request.Note?.Trim(),
            Status = ReservationStatus.Pending
        };

        ctx.Reservations.Add(entity);
        await ctx.SaveChangesAsync(ct);

        return entity.Id;
    }
}
