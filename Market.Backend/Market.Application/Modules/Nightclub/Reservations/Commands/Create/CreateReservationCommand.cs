namespace Market.Application.Modules.Nightclub.Reservations.Commands.Create;

public class CreateReservationCommand : IRequest<int>
{
    public int EventId { get; set; }
    public int ClubTableId { get; set; }
    public string GuestName { get; set; }
    public string GuestEmail { get; set; }
    public string? GuestPhone { get; set; }
    public int NumberOfGuests { get; set; }
    public string? Note { get; set; }
}
