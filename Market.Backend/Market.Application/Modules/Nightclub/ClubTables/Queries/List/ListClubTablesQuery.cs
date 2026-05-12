namespace Market.Application.Modules.Nightclub.ClubTables.Queries.List;

public sealed class ListClubTablesQuery : BasePagedQuery<ListClubTablesQueryDto>
{
    public bool? IsVip { get; init; }
    public bool? OnlyEnabled { get; init; }
}
