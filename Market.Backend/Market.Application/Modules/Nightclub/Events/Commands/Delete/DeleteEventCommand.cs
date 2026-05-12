namespace Market.Application.Modules.Nightclub.Events.Commands.Delete;

public class DeleteEventCommand : IRequest<Unit>
{
    public required int Id { get; set; }
}
