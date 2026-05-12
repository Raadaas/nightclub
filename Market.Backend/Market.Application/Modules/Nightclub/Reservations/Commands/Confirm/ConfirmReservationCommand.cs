namespace Market.Application.Modules.Nightclub.Reservations.Commands.Confirm;

public class ConfirmReservationCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string? AdminNote { get; set; }
}
