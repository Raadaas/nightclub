namespace Market.Application.Modules.Nightclub.Events.Queries.GetById;

public class GetEventByIdQuery : IRequest<GetEventByIdQueryDto>
{
    public int Id { get; set; }
}
