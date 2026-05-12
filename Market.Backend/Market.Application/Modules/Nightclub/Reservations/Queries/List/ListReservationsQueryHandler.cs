namespace Market.Application.Modules.Nightclub.Reservations.Queries.List;

public sealed class ListReservationsQueryHandler(IAppDbContext ctx)
    : IRequestHandler<ListReservationsQuery, PageResult<ListReservationsQueryDto>>
{
    public async Task<PageResult<ListReservationsQueryDto>> Handle(ListReservationsQuery request, CancellationToken ct)
    {
        var q = ctx.Reservations.AsNoTracking();

        if (request.EventId.HasValue)
            q = q.Where(x => x.EventId == request.EventId.Value);

        if (request.Status.HasValue)
            q = q.Where(x => x.Status == request.Status.Value);

        var projected = q.OrderByDescending(x => x.CreatedAtUtc)
            .Select(x => new ListReservationsQueryDto
            {
                Id = x.Id,
                EventId = x.EventId,
                EventTitle = x.Event.Title,
                ClubTableId = x.ClubTableId,
                ClubTableName = x.ClubTable.Name,
                GuestName = x.GuestName,
                GuestEmail = x.GuestEmail,
                GuestPhone = x.GuestPhone,
                NumberOfGuests = x.NumberOfGuests,
                Status = x.Status,
                StatusName = x.Status.ToString(),
                CreatedAtUtc = x.CreatedAtUtc
            });

        return await PageResult<ListReservationsQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
