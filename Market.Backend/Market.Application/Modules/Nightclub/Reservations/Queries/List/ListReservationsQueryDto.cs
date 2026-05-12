namespace Market.Application.Modules.Nightclub.Reservations.Queries.List;

public sealed class ListReservationsQueryDto
{
    public required int Id { get; init; }
    public required int EventId { get; init; }
    public required string EventTitle { get; init; }
    public required int ClubTableId { get; init; }
    public required string ClubTableName { get; init; }
    public required string GuestName { get; init; }
    public required string GuestEmail { get; init; }
    public required string GuestPhone { get; init; }
    public required int NumberOfGuests { get; init; }
    public required ReservationStatus Status { get; init; }
    public required string StatusName { get; init; }
    public required DateTime CreatedAtUtc { get; init; }
}
