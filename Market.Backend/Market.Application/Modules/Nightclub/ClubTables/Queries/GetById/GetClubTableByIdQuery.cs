namespace Market.Application.Modules.Nightclub.ClubTables.Queries.GetById;

public class GetClubTableByIdQuery : IRequest<GetClubTableByIdQueryDto>
{
    public int Id { get; set; }
}
