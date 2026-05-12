namespace Market.Application.Modules.Nightclub.MenuItems.Commands.Delete;

public class DeleteMenuItemCommand : IRequest<Unit>
{
    public required int Id { get; set; }
}
