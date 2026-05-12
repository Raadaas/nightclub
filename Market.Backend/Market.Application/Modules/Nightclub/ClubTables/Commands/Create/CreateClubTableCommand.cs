namespace Market.Application.Modules.Nightclub.ClubTables.Commands.Create;

public class CreateClubTableCommand : IRequest<int>
{
    public string Name { get; set; }
    public string? Section { get; set; }
    public int Capacity { get; set; }
    public decimal MinSpend { get; set; }
    public bool IsVip { get; set; }
    public string? Description { get; set; }
}
