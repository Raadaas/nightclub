namespace Market.Application.Modules.Nightclub.ClubTables.Commands.Delete;

public class DeleteClubTableCommand : IRequest<Unit>
{
    public required int Id { get; set; }
}
