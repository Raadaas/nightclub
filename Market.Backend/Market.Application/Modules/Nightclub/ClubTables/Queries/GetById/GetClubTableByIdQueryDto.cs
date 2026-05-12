namespace Market.Application.Modules.Nightclub.ClubTables.Queries.GetById;

public class GetClubTableByIdQueryDto
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required string? Section { get; init; }
    public required int Capacity { get; init; }
    public required decimal MinSpend { get; init; }
    public required bool IsVip { get; init; }
    public required string? Description { get; init; }
    public required bool IsEnabled { get; init; }
}
