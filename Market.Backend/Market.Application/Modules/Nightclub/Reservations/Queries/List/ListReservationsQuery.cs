namespace Market.Application.Modules.Nightclub.Reservations.Queries.List;

public sealed class ListReservationsQuery : BasePagedQuery<ListReservationsQueryDto>
{
    public int? EventId { get; init; }
    public ReservationStatus? Status { get; init; }
}
