namespace Market.Application.Modules.Nightclub.Reservations.Queries.GetById;

public class GetReservationByIdQueryDto
{
    public required int Id { get; init; }
    public required int EventId { get; init; }
    public required string EventTitle { get; init; }
    public required DateTime EventDate { get; init; }
    public required int ClubTableId { get; init; }
    public required string ClubTableName { get; init; }
    public required string? ClubTableSection { get; init; }
    public required int? UserId { get; init; }
    public required string GuestName { get; init; }
    public required string GuestEmail { get; init; }
    public required string GuestPhone { get; init; }
    public required int NumberOfGuests { get; init; }
    public required ReservationStatus Status { get; init; }
    public required string StatusName { get; init; }
    public required string? Note { get; init; }
    public required string? AdminNote { get; init; }
    public required DateTime CreatedAtUtc { get; init; }
    public required DateTime? ConfirmedAtUtc { get; init; }
    public required DateTime? CancelledAtUtc { get; init; }
}
