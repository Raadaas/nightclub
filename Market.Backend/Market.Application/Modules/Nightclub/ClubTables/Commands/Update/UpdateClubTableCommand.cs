namespace Market.Application.Modules.Nightclub.ClubTables.Commands.Update;

public sealed class UpdateClubTableCommand : IRequest<Unit>
{
    [JsonIgnore]
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Section { get; set; }
    public int Capacity { get; set; }
    public decimal MinSpend { get; set; }
    public bool IsVip { get; set; }
    public string? Description { get; set; }
    public bool IsEnabled { get; set; }
}
