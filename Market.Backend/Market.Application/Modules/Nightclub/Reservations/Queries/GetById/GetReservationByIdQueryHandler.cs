namespace Market.Application.Modules.Nightclub.Reservations.Queries.GetById;

public class GetReservationByIdQueryHandler(IAppDbContext ctx)
    : IRequestHandler<GetReservationByIdQuery, GetReservationByIdQueryDto>
{
    public async Task<GetReservationByIdQueryDto> Handle(GetReservationByIdQuery request, CancellationToken ct)
    {
        var dto = await ctx.Reservations
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new GetReservationByIdQueryDto
            {
                Id = x.Id,
                EventId = x.EventId,
                EventTitle = x.Event.Title,
                EventDate = x.Event.Date,
                ClubTableId = x.ClubTableId,
                ClubTableName = x.ClubTable.Name,
                ClubTableSection = x.ClubTable.Section,
                UserId = x.UserId,
                GuestName = x.GuestName,
                GuestEmail = x.GuestEmail,
                GuestPhone = x.GuestPhone,
                NumberOfGuests = x.NumberOfGuests,
                Status = x.Status,
                StatusName = x.Status.ToString(),
                Note = x.Note,
                AdminNote = x.AdminNote,
                CreatedAtUtc = x.CreatedAtUtc,
                ConfirmedAtUtc = x.ConfirmedAtUtc,
                CancelledAtUtc = x.CancelledAtUtc
            })
            .FirstOrDefaultAsync(ct);

        if (dto is null)
            throw new MarketNotFoundException($"Reservation (ID={request.Id}) not found.");

        return dto;
    }
}
