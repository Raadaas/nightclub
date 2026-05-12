namespace Market.Application.Modules.Nightclub.Reservations.Commands.Cancel;

public class CancelReservationCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string? AdminNote { get; set; }
}
