namespace Market.Application.Modules.Nightclub.Reservations.Queries.List;

public sealed class ListReservationsQueryHandler(IAppDbContext ctx, IAppCurrentUser currentUser)
    : IRequestHandler<ListReservationsQuery, PageResult<ListReservationsQueryDto>>
{
    public async Task<PageResult<ListReservationsQueryDto>> Handle(ListReservationsQuery request, CancellationToken ct)
    {
        var q = ctx.Reservations.AsNoTracking();

        if (!currentUser.IsAdmin && !currentUser.IsManager && !currentUser.IsEmployee)
        {
            var userId = currentUser.UserId
                ?? throw new MarketConflictException("User not authenticated.");
            q = q.Where(x => x.UserId == userId);
        }

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
                CreatedAtUtc = x.CreatedAtUtc,
                EventDate = x.Event.Date,
            });

        return await PageResult<ListReservationsQueryDto>.FromQueryableAsync(projected, request.Paging, ct);
    }
}
